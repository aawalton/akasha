import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueAudioManagement = {
  id: "01a0c63d-00d2-7256-bc8e-cfe8abcfaa81",
  type: "page-type/initiative",
  slug: "nimue-audio-management",
  domain: "page-type/audio",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "A sound's bytes sit beside its page rather than under a key.",
      workingMemory:
        "`persist-audio.module.code.ts:68` puts the whole wav at `audio/<pageId>.wav` through `audioObjectKey`, the one audio key-maker, at `object-store-key.module.code.ts:8`. The mirror is `image-bytes.file-property.ts`, whose `propertySlug` is `bytes`, `holdsBytes` is true and `runsFileLength` is false, declared `uncommitted` on the page type so the bytes land as `<slug>.audio.bytes.uncommitted.wav`.",
    },
    {
      statement: "A sound's slug is its own bytes, so no sound is kept twice.",
      workingMemory:
        "`imageSlugOf` at `picture-landing.module.code.ts:38` is `image-` and the first sixteen hex of the sha256 of the bytes, which made a duplicate structurally impossible across 9,814 pages. `audio-` and sixteen hex does the same here. `isRiff` in `infrastructure/inference/client/modules/riff-bytes/riff-bytes.module.code.ts` already reads `52 49 46 46`, which is the work `endingOf` does for a picture.",
    },
    {
      statement: "A sound states what made it.",
      workingMemory:
        "`buildAudioPageProperties` at `persist-audio.module.code.ts:31` already gathers title, engine, service, operation, model, prompt, seed, instruct, text, durationSeconds, audioPath and inferenceRun. An image carries none of this, since `persistInferenceImage` hands over an empty bag, so the audio page type declares properties where the image page type needed almost none. `audioPath` goes, because the page holds the bytes.",
    },
    {
      statement: "The audio rows of the generation log are audio pages.",
      workingMemory:
        "`ROW_PROPERTIES` at `generation-log.module.code.ts:39` routes `audio` to the `audios` property, and the images half of that table went with `alan.generation-log.images.jsonl`. `generation-audios.file-property.ts` decides that an audio row records where its bytes are rather than the bytes, which is the sentence this work ends.",
    },
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
