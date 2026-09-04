import type { Finding } from "../finding.page-type.ts"

export const aSecondEditOutsideAkashaIsRefusedWithNothingAbleToRefreshTheRecord = {
  id: "01a06390-4c21-7a3e-9f52-6b1d84e0c7a5",
  pageTypeSlug: "finding",
  slug: "a-second-edit-outside-akasha-is-refused-with-nothing-able-to-refresh-the-record",
  domainSlug: "domain/temper",
  claim:
    "`akasha edit` holds a per-agent record of every file it writes outside `akasha/`, and refuses a later edit once that file has moved on disk. Nothing refreshes that record: `akasha read` refuses such a path and records nothing. So once another seat commits to a file an agent has already edited, that agent is refused every further edit of it. It bites hardest on the root `package.json` and `bun.lock`, which every ablation touches.",
  evidence:
    "Measured 2026-09-02. Ablating `temper/game-characters-stats` wrote the root `package.json` and left `bun.lock` unchanged, at `7a55e01b8b`. Another seat then wrote the root manifest at `22e48b7606`. Every later attempt to edit it answered that what is on disk for `bun.lock` and for `package.json` is not the body this agent read: twenty consecutive attempts, no successes, so retrying does not win this.\n\nThe same shape on a colder file: `temper/scripts/package.json` was edited at `da68b5b361`, another seat wrote it at `21e18a8217`, and ten later attempts were refused.\n\nThat the record cannot be refreshed is the part with no way around it. `akasha read --file-path package.json` refuses the path for sitting outside `akasha/`, saying a path is read against the repository root and the command reads what is inside it. `bun.lock` is 381,874 bytes against a 28,000-byte answer, so no read would carry it whole even were one permitted.\n\nThe first edit of a given path in a session succeeds, and edits to files no other seat touches succeed: `temper/web/package.json` took four edits in one session, each on the first try.\n\nOne live consequence is in the tree now. `temper/game-items-addon` was ablated at `c7d9fa364f` and the root `workspaces` list still names it, so `bun install` refuses for the whole tree at `package.json:68` and no seat gets a `node_modules` symlink. Removing that one row is a one-line edit that cannot land.",
} as const satisfies Finding
