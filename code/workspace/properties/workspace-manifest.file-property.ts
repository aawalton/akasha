import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const workspaceManifest = {
  id: "01a06cbb-60a1-7753-bbdc-f8f50db94a79",
  type: "page-type/file-property",
  slug: "workspace-manifest",
  propertySlug: "workspace-manifest",
  definition: "what a workspace states about itself",
  extensions: ["json"],
  fileName: "package.json",
  toolResolvesPaths: true,
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The editor reads an extension's panels and commands from one manifest.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T14:03:34.433Z",
  updatedAt: "2026-10-27T18:24:42.194Z",
} as const satisfies FileProperty
