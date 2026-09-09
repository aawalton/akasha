import type { Domain } from "../../domains/domain.page-type.ts"

export const containerImage = {
  id: "01a0675b-16dc-759d-9b19-cf1118f36276",
  pageTypeSlug: "domain",
  slug: "container-image",
  definition: "a built copy of everything a program needs to run",
  parts: [
    "workspace-package/dockerfiles",
    "container-recipe/postgres-cnpg-image",
    "manifest/buildkit",
    "manifest/buildkit-prune",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An image is tagged with a hash of the image's build inputs rather than a name or version.",
    },
  ],
} as const satisfies Domain
