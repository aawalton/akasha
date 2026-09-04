import type { Finding } from "../finding.page-type.ts"

export const theFileSizeCeilingIsReadAfterFormattingNotBefore = {
  id: "01a05ba9-d098-7ecb-845b-6eead4e1a962",
  pageTypeSlug: "finding",
  slug: "the-file-size-ceiling-is-read-after-formatting-not-before",
  domainSlug: "domain/akasha-migration",
  claim:
    "The fifteen thousand byte ceiling is read against the body after akasha formats it rather than the body handed in, so a file packed to a budget measured with `wc -c` can be refused for being half again as large as the packer believed. Nothing says which body the number is about, and the one generator in this repository that packs to that ceiling had picked its budget the wrong way.",
  evidence:
    "Twenty-five of the twenty-six icon index shards were refused on landing. `entries-03` was handed in at 11,387 bytes and answered for at 17,061, a ratio of 1.498; across the twenty-five the ratio ran from 1.313 to 1.498. The inflation is the formatter breaking one long line per icon into one line per keyword, so it grows with how much prose a line holds rather than with the file's size, and it cannot be read off the source.\n\n`tools/commands/page/icon-search-index/generate.ts` states `SHARD_CEILING_BYTES = 12_000` and says beside it that the slack to fifteen thousand is what keeps a lucide release that grows its metadata from pushing a shard over unnoticed. Measured against the formatted body there is no slack at all: 12,000 becomes as much as 17,976. The finding `the-icon-search-index-has-a-generator-nothing-holds-it-to` recorded the largest file as 11,792 bytes and read that as comfortable. It was already over.\n\nRepacking at a raw budget of 8,000 bytes turned twenty-six shards into thirty-eight with a largest raw size of 8,046, and all thirty-eight landed. That is the empirical margin: raw times 1.5 is the number to hold to, until the check says which body it means.\n\nThe refusal names the formatted size, so `akasha write --dry-run` answers the question exactly and is the only way found here to ask it. Nothing else in the repository states the relationship.",
} as const satisfies Finding
