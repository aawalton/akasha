import type { Finding } from "../finding.page-type.types.ts"

export const theLokiCommandLooksInANamespaceTheClusterNoLongerHolds = {
  id: "01a08232-eeec-7e57-b85e-1d07246e4a8b",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "the-loki-command-looks-in-a-namespace-the-cluster-no-longer-holds",
  domain: "command/infrastructure-loki",
  claim:
    "`akasha loki logs <pod>` looks in namespace `ci` where the caller names none, and the `ci` namespace went with the pipeline engine. A call naming no namespace therefore answers no line, however many the pod wrote. What the default should become is a choice: refuse a call naming no namespace, or look across every namespace the pod has streams in.",
  evidence:
    '`commands/pages/loki/loki.command.code.ts` carries `const NAMESPACE_BY_DEFAULT = "ci"`, and `readIn` reads `said.get(NAMESPACE) ?? NAMESPACE_BY_DEFAULT`. `loki.command.ts` says the same in its taking: `the namespace to look in, read as a literal string, `ci` where none is said`. `loki.command.test.ts` asserts `read.namespace` is `ci` where nothing is said.\n\nThe matcher pins the namespace exactly rather than as a pattern: `buildLogMatcher` in `infrastructure/cluster/services/loki-log-fetching/loki-log-fetching.module.code.ts` writes `namespace="<value>"`. So a namespace nothing writes into answers nothing rather than answering widely.\n\nThe pieces a better answer needs are already there. `findPodNamespaces` asks Loki\'s series endpoint which namespaces a pod has streams in, and `chooseLogsDiagnostic` already reports them on the bounding line when the answer held no line. Neither is reached until a query has already answered nothing.',
} as const satisfies Finding
