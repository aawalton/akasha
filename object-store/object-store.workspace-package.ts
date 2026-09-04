import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const objectStore = {
  id: "01a05cbb-139c-75e2-a97e-d9467fae14ce",
  pageTypeSlug: "workspace-package",
  slug: "object-store",
  definition: "bytes kept under a key in a SeaweedFS bucket",
  manifest: "json",
  partSlugs: [
    "module/object-store-key",
    "module/s3-multipart",
    "module/s3-signing",
    "module/seaweedfs-config",
    "module/seaweedfs-store",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Durability is a property of each bucket.",
    },
    {
      invariantKind: "departure",
      statement: "Durability is a property of each prefix where one bucket's prefixes differ.",
    },
    {
      invariantKind: "departure",
      statement: "What cannot be remade is copied where nothing deletes.",
    },
    {
      invariantKind: "departure",
      statement: "That copy is bounded by a declared size.",
    },
    {
      invariantKind: "absence",
      statement: "No age rule reaches the copy of what cannot be remade.",
    },
  ],
} as const satisfies WorkspacePackage
