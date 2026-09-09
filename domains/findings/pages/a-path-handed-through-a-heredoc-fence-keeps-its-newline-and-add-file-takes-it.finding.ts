import type { Finding } from "../finding.page-type.types.ts"

export const aPathHandedThroughAHeredocFenceKeepsItsNewlineAndAddFileTakesIt = {
  id: "01a0888a-0960-71c7-9ff5-8f849319875b",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-path-handed-through-a-heredoc-fence-keeps-its-newline-and-add-file-takes-it",
  domain: "change-agent-file",
  claim:
    "A scalar argument to `akasha change draft` can be written two ways, `at: <path>` on its own line or `at HEREDOC-AT` opening a fence. Through the fence the value keeps the newline that ends it, and `change-agent/add-file` takes that value as the path. Three drafts written that way were kept with the path spelled correctly followed by a newline, and the command's own output showed the path without one, so nothing on screen said what had been kept. `change-file` handed the same value refuses, because no file exists at a name ending in a newline, so the two acts disagree about a path they were handed alike.",
  evidence:
    "Seen while drafting `add-property-values`. The three `add-file` drafts were accepted; the newline was found by reading the kept edits file rather than the output. The drafts were dropped and rewritten with `at: <path>`, so nothing landed, and whether `akasha change apply` would refuse a path ending in a newline is untested — the hole may be closed further down, or may not be. Either trimming a scalar argument read from a fence, or refusing a path carrying whitespace at either end, would settle it where it is read rather than where it lands.",
} as const satisfies Finding
