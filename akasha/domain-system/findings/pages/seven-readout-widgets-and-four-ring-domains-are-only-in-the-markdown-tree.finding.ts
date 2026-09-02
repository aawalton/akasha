import type { Finding } from "../finding.page-type.ts"

export const sevenReadoutWidgetsAndFourRingDomainsAreOnlyInTheMarkdownTree = {
  id: "01a0641a-d59b-7eef-bb62-2e6f202f9d59",
  pageTypeSlug: "finding",
  slug: "seven-readout-widgets-and-four-ring-domains-are-only-in-the-markdown-tree",
  domainSlug: "workspace-package/readout-system",
  claim:
    "Seven of the nine `readouts/widget/` pages and all four `readouts/ring/` domain pages have no akasha twin. They carry feed endpoints, deep links, gallery text and drawing rules that exist nowhere else. Two widget properties, `app-slug` and `caption`, have no counterpart on the akasha readout-widget page type, so even the two widgets that did move could not have carried them.",
  evidence:
    "Measured 2026-09-02 by listing both trees and reading every page on each side.\n\nakasha holds 2 readout widgets, both `*-categorize`. The seven with no twin: `alanwalton-claude-usage`, `alanwalton-inbox-stoplights`, `alanwalton-safety-level`, `alanwalton-surplus`, `alanwalton-upkeep-stoplights`, `smilingjenny-safety-level`, `smilingjenny-surplus`. Each declares an app slug, group slugs, a gallery name and description, families, a kind, a feed endpoint and a place, and five of the seven a deep link under `opens`.\n\n`akasha/readout-system/readout-widgets/readout-widget.page-type.ts:43-53` declares nine properties. Neither `app-slug`, saying which iOS app ships the tile, nor `caption` is among them, and five of the seven carry a caption. The markdown `widget-path` became `component-slug`, so that one is repointed rather than lost.\n\n`readouts/ring/` holds `ring`, `budget-ring`, `completion-ring` and `stoplight-ring`. The akasha `readout-ring` module covers the browser arc-and-rung mechanics alone. Absent, each verified at zero files under `akasha/`: the two ring sizes and the tile spans defining them; that every arc starts at twelve on the clock and sweeps clockwise; that a full ring can be any color because arc and color measure different quantities; that a subject with no reading is black and a reading below black or above blue keeps its stroke; and the whole completion-ring fallback ladder for a feed sending no thresholds, blue at full, green at three quarters, yellow at a half, red at a quarter, black below.",
} as const satisfies Finding
