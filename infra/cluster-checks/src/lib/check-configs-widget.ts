import type { CheckConfig } from "./check-configs-types"
import { PAYLOAD_MIRRORS } from "../../../../tools/lib/check-workflow/widget-payload-shape-mirror"

const CANONICAL_SEEDS: readonly string[] = [
  ...new Set(PAYLOAD_MIRRORS.map((mirror) => `ts-file:code:${mirror.canonical.file}`)),
]

const DECLARED_SEEDS: readonly string[] = [
  "ts-file:code:packages/shared/status-bar-access/src/stoplight-circle.ts",
  "ts-file:code:infra/cluster-checks/src/checks/check-widget-payload-shape-mirror.ts",
  "ts-file:code:infra/cluster-checks/src/lib/widget-payload-shape-mirror.ts",
  "ts-file:code:infra/cluster-checks/src/lib/widget-payload-corpus.ts",
  "ts-file:code:infra/cluster-checks/src/lib/widget-wire-vocabulary.ts",
]

export const WIDGET_MIRROR_CHECKS: CheckConfig[] = [
  {
    name: "widget-payload-shape-mirror",
    dispatchNodeTypes: [
      { kind: "swift-file", under: "akasha:native-shell/alanwalton/ios-widget" },
      { kind: "swift-file", under: "akasha:ios-widget/ring" },
    ],
    dispatchNodes: [...CANONICAL_SEEDS, ...DECLARED_SEEDS],
    script: "infra/cluster-checks/src/checks/check-widget-payload-shape-mirror.ts",
  },
]
