import type { Finding } from "../finding.page-type.ts"

export const aDeployPlansFromTheMarkdownHalfOfASplitServicePage = {
  id: "01a05c17-8228-713b-a897-4e499bec198f",
  pageTypeSlug: "finding",
  slug: "a-deploy-plans-from-the-markdown-half-of-a-split-service-page",
  domainSlug: "page-type/cluster-service",
  claim:
    "`ops deploy` reads only the `.md` half of a cluster-service page, so for the six services carrying both spellings it plans from the older half and cannot see `image`, `replicas`, `containerPort` or `manifestCode`, which stand only in the `.ts`. This is not the kebab and camel fault in another hat: the markdown says `kind` where the TypeScript says `resourceKind`.",
  evidence:
    '`deploy-system/service/service.ts:30-33` finds service pages by markdown glob alone, and `serviceFrom` at :49-67 builds each one out of `textField(fm, ...)` over that file\'s frontmatter, reading `slug`, `title`, `kind`, `namespace` and `resource-name`. The `ClusterService` interface at :7-14 has room for nothing else, so the plan `planFor` builds at `ops-cli/global/deploy/deploy.command.code.attachment.ts:196` is drawn entirely from those five fields. `akasha/service-system/cluster-service/cluster-services/alanwalton-web.cluster-service.ts:8-14` carries `resourceKind: "Deployment"`, `namespace: "alanwalton"` and `resourceName: "web"`, matching the markdown, and then four more the markdown has no line for: `image`, `replicas: 1`, `containerPort: 3000` and `manifestCode`. Six services carry both halves: alanwalton-atlas, alanwalton-web, archive-of-worlds-web, audhdalan-web, smilingjenny-web and temper-web. The two halves also disagree on names, not only on spelling: `kind` against `resourceKind`, `resource-name` against `resourceName`. Camelising the markdown key would answer the second pair and not the first, and would still reach none of the four properties that exist on one side only. Read from source; I did not run `ops deploy`, so what a plan drawn from the fuller half would differ on is not measured here. The call taken: filed rather than fixed, because which half should win is a design question — the markdown is what deploy has always read, and the four extra properties may be meant for a later reader rather than live.',
} as const satisfies Finding
