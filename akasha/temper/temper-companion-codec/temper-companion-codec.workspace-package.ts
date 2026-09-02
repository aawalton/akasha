import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperCompanionCodec = {
  id: "01a062e7-4dda-7f1d-8fd9-fe2d9062ea42",
  pageTypeSlug: "workspace-package",
  slug: "temper-companion-codec",
  definition:
    "packing a companion build into text and reading one back at whichever update wrote it",
  manifest: "json",
  partSlugs: [
    "module/companion-codec",
    "module/companion-codec-indices",
    "module/companion-codec-v48",
    "module/companion-codec-v49",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An update that changed the layout has a codec of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Every past update stays readable and only the newest one is written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The first byte says the build is a companion and the next byte says which update wrote the build.",
    },
    {
      invariantKind: "departure",
      statement: "A build whose first two bytes are not recognised is read as nothing.",
    },
  ],
} as const satisfies WorkspacePackage
