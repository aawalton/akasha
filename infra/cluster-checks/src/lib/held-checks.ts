export interface HeldCheck {
  readonly name: string
  readonly scriptPath: string
  readonly dispatchNodes: readonly string[]
  readonly heldReason: string
}

export const HELD_CHECKS: readonly HeldCheck[] = [
  {
    name: "test-classification",
    scriptPath: "infra/cluster-checks/src/checks/check-test-classification.ts",
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-test-classification.ts",
      "ts-file:code:infra/cluster-checks/src/lib/test-classification.ts",
    ],
    heldReason:
      "Held, not abandoned: registered in no check-configs table, so no pipeline creates it, while the check, its libraries and its tests all stand. Alan's ruling (#19104). Of the 60 violations standing when it was held, 54 turned on a judgment the code does not carry — a lane only a removed comment placed the file in, or a parsed process start a person had warranted hermetic — so the check cannot be judged until the test architecture is revisited and there are domain definitions to judge it against. Restoring those comments is not the route back: two of them certified a database lane by naming a package in prose the file does not import, which this check's raw containment read as evidence. To bring it back, register it in a check-configs table again and re-add its ALLOWLISTED_REPO_WIDE_TS_SCANNERS entry.",
  },
]
