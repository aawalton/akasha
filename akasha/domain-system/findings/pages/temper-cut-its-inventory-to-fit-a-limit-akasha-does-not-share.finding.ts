import type { Finding } from "../finding.page-type.ts"

export const temperCutItsInventoryToFitALimitAkashaDoesNotShare = {
  id: "01a05fdf-9a2c-77b7-9fa8-7c0771adbc38",
  pageTypeSlug: "finding",
  slug: "temper-cut-its-inventory-to-fit-a-limit-akasha-does-not-share",
  domainSlug: "domain/temper-holdings",
  claim:
    "The 458 inventory chunk pages are not 458 things. They are 157 inventory captures, each written as one JSON document and then divided on a 900,000 byte count that has nothing to do with what the document says. A chunk boundary falls mid-token, so a chunk alone parses as nothing.",
  evidence:
    '`temper/game-items-core/src/shard-inventory.ts` holds `MAX_CHUNK_BYTES = 900_000` and divides by `json.slice(i, i + MAX_CHUNK_BYTES)`. `assemble-inventory.ts` sorts by `chunkIndex`, joins with the empty string and parses once. The file `2026-08-19-23-46-47-1` opens `false,"bopTradeable":false`, mid-record.\n\nThe count comes from a document limit in the store temper wrote to, and akasha limits no page count. So the shape akasha wants is one page for one capture, carrying one file.\n\nThe chunks were recreated as they were, because akasha\'s own 15,000 byte file ceiling refuses a whole capture as firmly as it refuses a piece, and rejoining them would trade 458 refusals for 157 larger ones. Rejoining is worth doing once a data file has a ceiling it can meet.',
} as const satisfies Finding
