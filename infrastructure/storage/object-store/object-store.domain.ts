import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const objectStore = {
  id: "01a05cbb-139c-75e2-a97e-d9467fae14ce",
  type: "domain",
  slug: "object-store",
  definition: "bytes kept under a key in a SeaweedFS bucket",

  parts: [
    "module/object-store-key",
    "module/s3-multipart",
    "module/s3-signing",
    "module/seaweedfs-config",
    "module/seaweedfs-store",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Durability is a property of each bucket.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Durability is a property of each prefix where one bucket's prefixes differ.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Bytes that cannot be remade are copied where nothing deletes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That copy is bounded by a declared size.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No age rule reaches the copy of bytes that cannot be remade.",
    },
  ],
} as const satisfies Domain
