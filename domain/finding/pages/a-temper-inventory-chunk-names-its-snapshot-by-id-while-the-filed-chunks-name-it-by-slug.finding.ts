import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const aTemperInventoryChunkNamesItsSnapshotByIdWhileTheFiledChunksNameItBySlug = {
  id: "01a0a163-7b03-71a7-94e0-17f6eac31fc0",
  type: "page-type/finding",
  slug: "a-temper-inventory-chunk-names-its-snapshot-by-id-while-the-filed-chunks-name-it-by-slug",
  domain: "domain/temper",
  claim:
    "Every inventory chunk already filed is deleted on the next import, because the import matches a chunk's snapshot against a page id and a filed chunk names its snapshot by slug.",
  evidence:
    '`temper/items-core/modules/plan-inventory-import/plan-inventory-import.module.code.ts` keeps a chunk only where `row.inventory === targetSnapshotId`, and pushes the chunk onto `chunksToDelete` otherwise. `targetSnapshotId` comes from `planSnapshotImport`, which reads the snapshot row\'s `id`, a uuid. A filed chunk states a slug instead: `temper/holdings/temper-inventory-chunk/pages/at-2026-08-19-23-46-47-0.temper-inventory-chunk.ts` states `inventory: "temper-inventory-snapshot/at-2026-08-19-23-46-47"`, which was `"at-2026-08-19-23-46-47"` before that value was written as an address. `temper/player-inventory-management-ui/modules/use-inventory-import/use-inventory-import.module.code.ts` writes `inventory: snapshotId` and queries `{ key: "inventory", eq: snapshotId }` with the same uuid, so the two halves have never agreed. Writing the value as an address left the mismatch exactly as it was.',
} as const satisfies Finding
