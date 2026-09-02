import { METRIC_TREE_DATA_01 } from "../metric-tree-data-01/metric-tree-data-01.module.code.ts"
import { METRIC_TREE_DATA_02 } from "../metric-tree-data-02/metric-tree-data-02.module.code.ts"
import type { MetricTree } from "../metric-tree-types/metric-tree-types.module.code.ts"

export const METRIC_TREE = {
  "damage": METRIC_TREE_DATA_01["damage"],
  "sustain": METRIC_TREE_DATA_02["sustain"],
  "toughness": METRIC_TREE_DATA_02["toughness"],
  "healing": METRIC_TREE_DATA_02["healing"],
  "mobility": METRIC_TREE_DATA_02["mobility"],
  "target": METRIC_TREE_DATA_02["target"],
  "other": METRIC_TREE_DATA_02["other"],
} satisfies MetricTree
