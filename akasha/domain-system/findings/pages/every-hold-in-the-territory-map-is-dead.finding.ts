import type { Finding } from "../finding.page-type.ts"

export const everyHoldInTheTerritoryMapIsDead = {
  id: "01a062a5-6401-788c-8f5d-2909aabf08e8",
  pageTypeSlug: "finding",
  slug: "every-hold-in-the-territory-map-is-dead",
  domainSlug: "domain/temper",
  claim:
    "All 47 rows of the addon territory map say `held`, and none of the 45 processes named is running. The map cannot tell a lane at work from one that ended, so a seat reading it either treats the whole tree as taken or learns to disregard it. 30 of the rows also name a path already under `akasha/`, and one names a package with no tracked file left.",
  evidence:
    '`tools/lib/check-workflow/territory-map.json` holds 47 rows, every one with `"state": "held"`. Their `heldBy` values are 45 distinct pids between 13024 and 15656; `ps -p` on each answers nothing for all 45. Two pids appear twice: 13037 was reported earlier for `TemperInventory` alone, and taking that as the exception is what hid the shape.\n\n30 rows name a package path beginning `akasha/temper/`, so the row survived its own migration and now marks a package that was recreated rather than one being worked. `TemperInventory -> temper/game-items-addon` names a path `git ls-files` answers nothing for, that package having gone at `c7d9fa364f`.\n\nWhat makes this worth a page rather than a sweep: a stale row and a live row are the same text. The nine rows repointed at `d9a156f291` were repointed for naming the wrong path, which is a defect the file shows. A dead pid is a defect the file cannot show, because a pid that has exited leaves the same digits behind as one still running. Reading the map is not enough; the hold has to be tested against the process table, and nothing in the repository does that today.\n\nThe map is also narrower than the tree it appears to cover. Its 47 rows are addons and add-on libraries; the temper packages with no addon of their own, `game-codec` and `game-items-core` among them, have no row at all, so absence from the map says nothing either way.',
} as const satisfies Finding
