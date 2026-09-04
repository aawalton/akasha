import type { Finding } from "../finding.page-type.ts"

export const theWritTrackersPortCommandNamesAHouseAndThrowsTheNameAway = {
  id: "01a061cc-a0b1-77f9-bfa1-75e11192d11c",
  pageTypeSlug: "finding",
  slug: "the-writ-trackers-port-command-names-a-house-and-throws-the-name-away",
  domainSlug: "domain/temper",
  claim:
    "WritWorthy's `/port` command reads the collectible name of the house it ports to, formats it, and never uses it. The message it prints names the house by its numeric id instead. The recreation drops the two dead statements, so the defect is recorded here rather than in the code.",
  evidence:
    '`temper/game-crafting-addon/src/writ-worthy/slash-commands.ts` lines 51 and 52 compute `house_collectible_id` and `house_name = zo_strformat("<<1>>", GetCollectibleName(house_collectible_id))`. `grep -rn house_name` over the whole add-on answers only that one line, so nothing reads it. Line 54 logs `fmt, owner, house_id` against `msg_port_house`, which `ui-strings-static.generated.ts` line 122 gives as `"Porting to owner:%s  house:%s"` — two placeholders for two arguments, the second of which is the id. A player sees `house:46` where the author plainly meant the house\'s name.',
} as const satisfies Finding
