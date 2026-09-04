import type { Finding } from "../finding.page-type.ts"

export const theCompletionBlobsWereReformattedThoughTheirPageTypeKeepsThemWordForWord = {
  id: "01a0658a-ca87-75b8-ada1-bc331a0c67fa",
  pageTypeSlug: "finding",
  slug: "the-completion-blobs-were-reformatted-though-their-page-type-keeps-them-word-for-word",
  domainSlug: "domain/temper",
  claim:
    "The temper-character-thing page type says a completion file is kept word for word as the game handed the file over, and 20 of the 24 completion blobs carried in were pretty-printed on the way, so that is false of them. No data was lost: every difference is whitespace, and the one player settings blob differs the same way.",
  evidence:
    "Comparing each completion blob against the pre-tonight tree at `/var/home/walton/repos/akasha-backup-2026-09-02`, 4 of 24 are byte-identical, 20 differ, and parsing both sides shows 0 semantic differences with key order preserved. The reformatted files grew about seven parts in ten: archmage-amerys went 120,610 bytes to 204,049, belavierr 126,232 to 212,717, ceria-springwater 117,213 to 196,732. The game hands the file over minified; what landed carries a newline and two-space indent, so the blobs came through a parse and a re-write rather than a copy. `player-9ba554f7-cb18-48bb-a709-ec935a895ca7.temper-player.settings.json` differs too, at 42,772 bytes against 42,932, and is semantically equal, against a property defined as how a player asked temper to behave as temper wrote it out. Repairing this by `akasha write` is barred in practice: the command reads the body it replaces first, and these are 120KB to 204KB each, which is why constraint 31 lands a migration through `landedMechanically` instead. The backup holds the game's own bytes for all 20, so the repair is a copy rather than a regeneration. Nothing here is lost while the old files remain; ablating `pages/temper-account-character/` before this is repaired is what would make the reformatting permanent.",
} as const satisfies Finding
