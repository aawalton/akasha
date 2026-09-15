import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const objectStore = {
  id: "01a05cbb-139c-75e2-a97e-d9467fae14ce",
  type: "page-type/domain",
  slug: "object-store",
  definition: "bytes kept under a key in a SeaweedFS bucket",

  parts: [
    "module/object-store-key",
    "module/s3-multipart",
    "module/s3-signing",
    "module/seaweedfs-config",
    "module/seaweedfs-store",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Durability is a property of each bucket.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Durability is a property of each prefix where one bucket's prefixes differ.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bytes that cannot be remade are copied where nothing deletes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That copy is bounded by a declared size.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No age rule reaches the copy of bytes that cannot be remade.",
    },
  ],
} as const satisfies Domain
