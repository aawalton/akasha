import type { Finding } from "../finding.page-type.ts"

export const thePublicDungeonListIsDeclaredTwiceInAkasha = {
  id: "01a060fa-78b2-7513-aaa4-10343b204916",
  pageTypeSlug: "finding",
  slug: "the-public-dungeon-list-is-declared-twice-in-akasha",
  domainSlug: "domain/temper",
  claim:
    "`PUBLIC_DUNGEONS` is declared in two akasha packages: `temper-addon-generators/temper-skill-point` and `temper-skill-point-finder/skill-point-sources`. Both carry the same 36 keys in the same order, and nothing keeps them equal. The generator's own comment says public dungeon sources have no other catalog home, and that is no longer true.",
  evidence:
    "Measured on 2026-09-02, right after the skill point generator moved into akasha from `tools/lib/temper-addon-data/generators`; before that move the two copies sat either side of the akasha boundary and only one was judged. Key lists compared index for index: 36 keys each, same set and same order, so they agree today. They are no straight duplication, because the records differ in what they carry — the generator holds `{ key, label }` to render `skillPointPublicDungeonSources`, while the finder holds `{ key, id, zone, achievement }` to point a player at a map. Deleting either would take something the other never had, so the answer is one shared list of keys the two read rather than a silent choice of one. A drift would be quiet: a key added to the finder alone would leave the generated table short a public dungeon, and a key added to the generator alone would render a row the finder can put nowhere on a map. Neither typecheck nor any check compares the two. The pair named `skill-point-public-dungeon` in `infra/cluster-checks/src/lib/codegen-type-identity-pairs.ts` compares the generator against `temper/player-completion-addon/src/skill-point-data.ts`, and that file matches the finder module byte for byte, being the temper original its akasha recreation has yet to replace. So the one check that does compare anything here reaches the copy on the way out rather than the copy that is kept.",
} as const satisfies Finding
