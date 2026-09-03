export const METRIC_SLICE_AVG300 = "node_cgroup_pressure_avg300_percent"
export const METRIC_SLICE_STALL = "node_cgroup_pressure_stall_seconds_total"
export const METRIC_POD_AVG300 = "node_pod_cgroup_pressure_avg300_percent"
export const METRIC_POD_STALL = "node_pod_cgroup_pressure_stall_seconds_total"
export const METRIC_POD_AGE = "node_pod_cgroup_age_seconds"

export const PRESSURE_RESOURCES = ["cpu", "io", "memory"] as const

export const PSI_PROM_FILENAME = "cgroup_psi.prom"

export const PSI_PROM_FILE_PATH = "/run/textfile/cgroup_psi.prom"

export const CGROUP_KUBEPODS_ROOT = "/host/sys/fs/cgroup/kubepods"

export const PSI_COLLECTOR_CONTAINER_NAME = "cgroup-psi-collector"

export const PSI_MIN_CGROUP_AGE_SECONDS = 300

export const PSI_COLLECT_INTERVAL_SECONDS = 30

export const ALERT_PSI_COLLECTOR_STALE = "CgroupPsiCollectorStale"
