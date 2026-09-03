import type { Finding } from "../finding.page-type.ts"

export const noPagePropertyClaimsAClusterServiceCodeAttachment = {
  id: "01a06863-b0af-7ed2-9bd1-39bd9eee5c1c",
  pageTypeSlug: "finding",
  slug: "no-page-property-claims-a-cluster-service-code-attachment",
  domainSlug: "workspace-package/service-system",
  claim:
    "A cluster service's manifest code is named by the `manifest-code` text property, which is a path in text and files nothing into the index. `file-has-its-page` therefore refuses every `.cluster-service.code.attachment.ts` a gated change carries. The same holds for a package's `deploy/dockerfile-extensions.json`, which no property names at all. Both kinds have to be landed with the glass broken, so no check reads either one.",
  evidence:
    "Measured 2026-09-03 landing `akasha/infrastructure/backup-retention`. Twenty-eight paths carrying eleven module pairs, two cluster-service pages and two page-type edits passed forty checks and landed as `ede15f01ce`. The three left out were refused `no page claims this file` and landed as `07c31d8bd3` with the glass broken.\n\nThe index bears this out rather than the refusal alone. The index's own path listing holds no entry for any of the fifteen `.cluster-service.code.attachment.ts` files under akasha, nor for `akasha/calendar-sync/deploy/dockerfile-extensions.json`, while every `.module.code.ts` beside them is there. So every attachment already landed is unclaimed too, and each of them was landed the same way or before the check.\n\nRenaming them into modules is barred from the other side: `akasha/infrastructure/k8s-synth/synth-discovery/synth-discovery.module.code.ts` finds manifest code by the glob `**/*.cluster-service.code.attachment.ts`, so the filename carries the discovery. `akasha/infrastructure/dockerfiles/dockerfile-writing/dockerfile-writing.module.code.ts` joins `<dir>/deploy/dockerfile-extensions.json` the same way.\n\nWhat would close it is a file property on the cluster-service page type holding the manifest code as a file beside the page rather than a path in text, and a named-file property for the image extensions on the workspace-package page type, as `manifest` already does for `package.json`.",
} as const satisfies Finding
