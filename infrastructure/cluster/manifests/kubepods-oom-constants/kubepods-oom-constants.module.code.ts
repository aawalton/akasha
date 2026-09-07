export const METRIC_LOCAL_OOM_KILL = "node_kubepods_memory_events_local_oom_kill"

export const METRIC_HIER_OOM_KILL = "node_kubepods_memory_events_hierarchical_oom_kill"

export const ALERT_SLICE_OOM_KILL = "KubepodsSliceOOMKill"
export const ALERT_SLICE_OOM_KILL_ABSENT = "KubepodsSliceOOMKillMetricAbsent"
export const ALERT_COLLECTOR_STALE = "KubepodsOomCollectorStale"

export const TEXTFILE_DIR = "/run/textfile"
export const PROM_FILENAME = "kubepods_memory_events.prom"

export const PROM_FILE_PATH = `${TEXTFILE_DIR}/${PROM_FILENAME}`

export const CGROUP_LOCAL_PATH = "/host/sys/fs/cgroup/kubepods/memory.events.local"
export const CGROUP_HIER_PATH = "/host/sys/fs/cgroup/kubepods/memory.events"

export const COLLECTOR_CONTAINER_NAME = "kubepods-oom-collector"
