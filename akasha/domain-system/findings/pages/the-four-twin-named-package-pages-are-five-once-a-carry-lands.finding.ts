import type { Finding } from "../finding.page-type.ts"

export const theFourTwinNamedPackagePagesAreFiveOnceACarryLands = {
  id: "01a06382-3951-7603-b4f5-4d3d2d97ef03",
  pageTypeSlug: "finding",
  slug: "the-four-twin-named-package-pages-are-five-once-a-carry-lands",
  domainSlug: "domain/temper",
  claim:
    "The exception to deleting a `pages/package/` page names four pages whose slug is also a directory under `akasha/temper`. That set is not fixed: a carry creates the twin directory, so the package it carries joins the set in the same change that makes the page deletable. Reading the four names as a list of exempt pages gets the next carry wrong. The mechanism is what carries over, and the ruling still favours deletion.",
  evidence:
    "The governing finding lists `temper-player-completion`, `temper-player-completion-ui`, `temper-player-completion-skills-morphs-ui` and `temper-player-profile`, measured at `2ef5c16ee5` against the 143 directories then under `akasha/temper`. Carrying `player-inventory-management-ui` in at `02fdee8159` created `akasha/temper/temper-player-inventory-management-ui`, whose name is exactly the slug of `pages/package/temper-player-inventory-management-ui.package.md`, making a fifth. That page was deleted at `7b04771a75` anyway, on the same reasoning the governing finding gives: the twin's own workspace-package page is the record in the current system, and the old page is a record in the one being replaced. The twin was checked first and carries the definition. No other page named this one as a `domain-parent-slug`; the page named `domain/temper-web-player` as its own parent.",
} as const satisfies Finding
