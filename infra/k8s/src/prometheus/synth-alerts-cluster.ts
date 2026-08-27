import { CLUSTER_NODE_RULES } from "./synth-alerts-cluster-node"
import { CLUSTER_WORKLOAD_RULES } from "./synth-alerts-cluster-workload"

export const CLUSTER_ALERTS = `  - name: cluster-alerts
    rules:
${CLUSTER_NODE_RULES}${CLUSTER_WORKLOAD_RULES}`
