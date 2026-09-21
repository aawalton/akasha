import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueAudioManagement = {
  id: "01a0c63d-00d2-7256-bc8e-cfe8abcfaa81",
  type: "page-type/initiative",
  slug: "nimue-audio-management",
  domain: "page-type/audio",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "A run that made a sound records the sha256 of those bytes.",
      workingMemory:
        "`inference-run-store.module.code.ts:73` already patches the run row with `outputAudioSha256`, so the number a slug would open with is measured there today. `inference-run.page-type.ts:37` still decides that audio a run made is kept as an object named from the row it was made under, where line 33 was mended for images already.",
    },
    {
      statement: "Every sound outside the repository is a page or is gone.",
      workingMemory:
        "SeaweedFS holds 1,407 objects under `agent-sessions/audio`, 4.216 GB, written between 30 June and 25 July 2026. `persona-voices` holds 80 more at 0.030 GB, the last on 19 August, and `story-audio` holds 3. Neither of those two prefixes has any key-making code in the tree, so nothing here put them there and nothing here reads them.",
    },
    {
      statement: "No audio bytes are in the object store.",
      workingMemory:
        "`audioObjectKey` has two references and both are inside `persist-audio.module.code.ts`, so the prefix is written and never read and this migration has no read side to keep working. `audio`, `persona-voices` and `story-audio` all leave `NON_EXPIRING_PREFIXES` at `seaweedfs-constants.module.code.ts:18` once they are empty.",
    },
  ],
  constraints: [
    "A sound's bytes are a file property akasha does not commit, and the sound's page is committed.",
    "The read-aloud renditions under `media-renders` are remade from a page's own text, so they are a held answer rather than a sound the system has.",
    "A sound's page is landed through the pages service, the one writer that can place bytes beside a page it does not commit.",
    "A wav is many times the size of a png, so what one landing carries is measured before the whole of it moves.",
  ],
} as const satisfies Initiative
