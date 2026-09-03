import {
  CGROUP_KUBEPODS_ROOT,
  METRIC_POD_AGE,
  METRIC_POD_AVG300,
  METRIC_POD_STALL,
  METRIC_SLICE_AVG300,
  METRIC_SLICE_STALL,
  PRESSURE_RESOURCES,
  PSI_COLLECT_INTERVAL_SECONDS,
  PSI_COLLECTOR_CONTAINER_NAME,
  PSI_MIN_CGROUP_AGE_SECONDS,
  PSI_PROM_FILE_PATH,
  PSI_PROM_FILENAME,
} from "../cgroup-psi-constants/cgroup-psi-constants.module.code.ts"
import { TEXTFILE_DIR } from "../kubepods-oom-constants/kubepods-oom-constants.module.code.ts"

const AWK_EMIT_PRESSURE = `$1 == "some" || $1 == "full" {
      kind = $1; avg = ""; tot = ""
      for (i = 2; i <= NF; i++) { split($i, kv, "="); if (kv[1] == "avg300") avg = kv[2]; if (kv[1] == "total") tot = kv[2] }
      if (avg != "" && tot != "") {
        printf "%s{%s,resource=\\"%s\\",kind=\\"%s\\"} %s\\n", gauge, ident, res, kind, avg
        printf "%s{%s,resource=\\"%s\\",kind=\\"%s\\"} %.6f\\n", counter, ident, res, kind, tot / 1000000
      }
    }`

const PSI_COLLECTOR_LOOP = `while true; do
  if [ -r "${CGROUP_KUBEPODS_ROOT}/cpu.pressure" ]; then
    now=$(date +%s)
    tmp="${TEXTFILE_DIR}/.${PSI_PROM_FILENAME}.tmp"
    {
      echo "# HELP ${METRIC_SLICE_AVG300} PSI 300s decaying average for the whole kubepods slice, as a PERCENT 0-100 (kernel avgN convention): 2.0 means 2%. Always present on every node, so its absence means the collector stopped."
      echo "# TYPE ${METRIC_SLICE_AVG300} gauge"
      echo "# HELP ${METRIC_SLICE_STALL} Cumulative PSI stall time for the whole kubepods slice in SECONDS (cgroup v2 total= field, microseconds, /1e6). rate() of this is a FRACTION 0-1, the opposite convention from the avg300 gauge."
      echo "# TYPE ${METRIC_SLICE_STALL} counter"
      echo "# HELP ${METRIC_POD_AGE} Age in seconds of one pod cgroup. A pod younger than ${PSI_MIN_CGROUP_AGE_SECONDS}s publishes no pressure series at all, because avg300 on a fresh cgroup is meaningless rather than low."
      echo "# TYPE ${METRIC_POD_AGE} gauge"
      echo "# HELP ${METRIC_POD_AVG300} PSI 300s decaying average for ONE POD cgroup, as a PERCENT 0-100: 2.0 means 2%. Join on uid to kube_pod_info for namespace and pod name. This is the POD cgroup, which aggregates every container in the pod."
      echo "# TYPE ${METRIC_POD_AVG300} gauge"
      echo "# HELP ${METRIC_POD_STALL} Cumulative PSI stall time for ONE POD cgroup in SECONDS. Resets when the pod cgroup is recreated; the uid changes with it, so a restart shows as a new series beside an ended one rather than a silent re-baseline."
      echo "# TYPE ${METRIC_POD_STALL} counter"
      {
        for res in ${PRESSURE_RESOURCES.join(" ")}; do
          f="${CGROUP_KUBEPODS_ROOT}/$res.pressure"
          [ -r "$f" ] || continue
          awk -v gauge="${METRIC_SLICE_AVG300}" -v counter="${METRIC_SLICE_STALL}" -v ident='slice="kubepods"' -v res="$res" '${AWK_EMIT_PRESSURE}' "$f"
        done
        for d in "${CGROUP_KUBEPODS_ROOT}"/pod*/ "${CGROUP_KUBEPODS_ROOT}"/besteffort/pod*/ "${CGROUP_KUBEPODS_ROOT}"/burstable/pod*/; do
          [ -d "$d" ] || continue
          mtime=$(stat -c %Y "$d" 2>/dev/null) || continue
          [ -n "$mtime" ] || continue
          age=$(( now - mtime ))
          [ "$age" -ge ${PSI_MIN_CGROUP_AGE_SECONDS} ] || continue
          uid=\${d%/}; uid=\${uid##*/pod}
          echo "${METRIC_POD_AGE}{uid=\\"$uid\\"} $age"
          for res in ${PRESSURE_RESOURCES.join(" ")}; do
            f="$d$res.pressure"
            [ -r "$f" ] || continue
            awk -v gauge="${METRIC_POD_AVG300}" -v counter="${METRIC_POD_STALL}" -v ident="uid=\\"$uid\\"" -v res="$res" '${AWK_EMIT_PRESSURE}' "$f"
          done
        done
      } | sort
    } > "$tmp" && mv "$tmp" "${PSI_PROM_FILE_PATH}"
  fi
  sleep ${PSI_COLLECT_INTERVAL_SECONDS}
done`

export function cgroupPsiCollectorContainer() {
  return {
    name: PSI_COLLECTOR_CONTAINER_NAME,
    image: "alpine:3.21",
    command: ["sh", "-c", PSI_COLLECTOR_LOOP],
    resources: {
      requests: { cpu: "20m", memory: "32Mi" },
      limits: { memory: "32Mi" },
    },
    securityContext: {
      runAsNonRoot: true,
      runAsUser: 65534,
      runAsGroup: 65534,
      allowPrivilegeEscalation: false,
      capabilities: { drop: ["ALL"] },
      readOnlyRootFilesystem: true,
    },
    volumeMounts: [
      { name: "sys", mountPath: "/host/sys", readOnly: true },
      { name: "textfile", mountPath: TEXTFILE_DIR },
    ],
  }
}
