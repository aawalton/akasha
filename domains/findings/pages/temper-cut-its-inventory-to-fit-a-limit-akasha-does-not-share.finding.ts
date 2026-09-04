import type { Finding } from "../finding.page-type.ts"

export const temperCutItsInventoryToFitALimitAkashaDoesNotShare = {
  id: "01a05fdf-9a2c-77b7-9fa8-7c0771adbc38",
  pageTypeSlug: "finding",
  slug: "temper-cut-its-inventory-to-fit-a-limit-akasha-does-not-share",
  domainSlug: "domain/temper-holdings",
  claim:
    "The 458 inventory chunk pages are not 458 things. They are 157 inventory captures, each written as one JSON document and then divided on a 900,000-byte count that has nothing to do with what the document says. A chunk boundary falls mid-token, so a chunk alone parses as nothing. Once the bytes come back, one capture is one page.",
  evidence:
    '`temper/game-items-core/src/shard-inventory.ts` holds `MAX_CHUNK_BYTES = 900_000` and divides by `json.slice(i, i + MAX_CHUNK_BYTES)`. `assemble-inventory.ts` sorts by `chunkIndex`, joins with the empty string and parses once. The file `2026-08-19-23-46-47-1` opens `false,"bopTradeable":false`, mid-record.\n\nThe 900,000 comes from a document limit in the store temper wrote to. Akasha limits no page count, so nothing there wants the division.\n\nThe pages landed keeping the division, because akasha\'s own 15,000-byte file ceiling refuses a whole capture as firmly as a piece of one and the bytes are out either way, so rejoining now would move the loss without lessening it. Each page keeps `byte-count`, what its piece held, so the division is undone by arithmetic rather than by reading the pieces.\n\nRejoin them into 157 pages once a whole capture can land. Commit `2c31d47f4a` since gave an entry file a ceiling of 8,388,608 bytes, which every capture would fit, but `ceilingFor` reaches a file whose named section is `jsonl` alone. A capture written as one JSON document is held to 15,000 still. The finding `a-completion-capture-is-one-document-so-the-entry-ceiling-does-not-reach-it` meets the same wall from the character side.',
} as const satisfies Finding
