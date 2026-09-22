import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { throwingAfter } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.test-fixtures.ts"
import type { Applied } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { refusingWith } from "akasha/command/modules/calling/calling.module.test-fixtures.ts"
import type { Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import type {
  NowPlayingCurrent,
  NowPlayingReader,
  NowPlayingState,
} from "akasha/command/pages/music/now-playing/music-now-playing.command.code.ts"
import {
  LENGTH_MS,
  PLAYING_ID,
  PLAYING_TITLE,
  TRACK_SLUG,
} from "akasha/command/pages/music/rate/modules/track-naming/track-naming.module.test-fixtures.ts"
import {
  ARTIST,
  musicRate,
  RELEASE,
  SONG,
  TRACK,
  taken,
} from "akasha/command/pages/music/rate/music-rate.command.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

export const scratch = scratchWorld()

export const ROOT = rootOf(process.cwd())

export const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha",
  from: ".",
  writer: null,
  agentId: null,
}

export const RATED = "aurora"

export const RATED_AT = `alan/music/catalog/artist/pages/${RATED}/${RATED}.artist.ts`

export const REACTION_AT = `alan/music/catalog/artist/pages/${RATED}/${RATED}.artist.reaction.txt`

export const REACTION = "she sings it plainly"

export const REACTION_FILED = `${REACTION}\n`

export function proseFileAt(): string {
  const at = join(scratch.rootFor("music-rate-prose-"), "reaction.md")
  writeFileSync(at, REACTION_FILED)
  return at
}

export function bodyAt(at: string): string {
  return readFileSync(join(ROOT, at), "utf8")
}

export const TRACK_AT = `alan/music/catalog/track/pages/${TRACK_SLUG}.track.ts`

export const RELEASE_SLUG = "ariana-grande-wicked-one-wonderful-night-live-the-soundtrack"

export const RELEASE_AT = `alan/music/catalog/release/pages/${RELEASE_SLUG}/${RELEASE_SLUG}.release.ts`

export const refusalsOf = refusingWith((argv: readonly string[]) => taken(argv, GIVEN))

export function refusalOf(argv: readonly string[]): string {
  return refusalsOf(argv).join("\n")
}

export function takingOf(argv: readonly string[]) {
  const held = taken(argv, GIVEN)
  if ("refused" in held) {
    throw new Error(`\`${argv.join(" ")}\` was refused — ${held.refused.join("; ")}`)
  }
  return held
}

const ITEM = {
  name: PLAYING_TITLE,
  uri: `spotify:track:${PLAYING_ID}`,
  id: PLAYING_ID,
  duration_ms: LENGTH_MS,
}

const STATE: NowPlayingState = {
  is_playing: true,
  device: { name: "the study" },
  progress_ms: 1000,
  item: ITEM,
}

const CURRENT: NowPlayingCurrent = { item: ITEM, progress_ms: 1000 }

export const PLAYER: NowPlayingReader = {
  getPlaybackState: async () => STATE,
  getCurrentlyPlaying: async () => CURRENT,
}

export const SILENT: NowPlayingReader = {
  getPlaybackState: async () => null,
  getCurrentlyPlaying: async () => null,
}

export const LANDED: Applied = {
  base: "2222222222222222222222222222222222222222",
  landed: [RATED_AT, REACTION_AT],
  formatted: [],
  said: [],
  wrong: [],
  commit: "3333333333333333333333333333333333333333",
}

type Reached = { readonly asked: readonly Asking[]; readonly said: string }

export type Reach = { readonly landing: Landing; readonly reached: Reached[] }

export function reaching(answer: Applied | Refused = LANDED): Reach {
  const reached: Reached[] = []
  return {
    reached,
    landing: async (_root, asked, said) => {
      reached.push({ asked, said })
      return answer
    },
  }
}

export function pathsIn(asked: readonly Asking[]): readonly string[] {
  return asked.map((one) => ("at" in one.given ? one.given.at : ""))
}

export function gradingAurora(reach: Reach) {
  return musicRate(
    ["--target", ARTIST, "--slug", RATED, "--grade", "A", "--reaction", REACTION],
    GIVEN,
    reach.landing
  )
}

export function gradingTrack(reach: Reach) {
  return musicRate(["--target", TRACK, "--slug", TRACK_SLUG, "--grade", "S"], GIVEN, reach.landing)
}

export function gradingRelease(reach: Reach) {
  return musicRate(
    ["--target", RELEASE, "--slug", RELEASE_SLUG, "--grade", "C"],
    GIVEN,
    reach.landing
  )
}

export const SONG_SLUG = "mitski-nobody"

export const TAGGING_SONG: readonly string[] = [
  "--target",
  SONG,
  "--slug",
  SONG_SLUG,
  "--tag",
  "longing",
  "--tag",
  "attraction",
]

export const SAYING_TWICE: readonly string[] = [
  "--target",
  SONG,
  "--slug",
  "a",
  "--insights",
  "x",
  "--insights-file",
  "y",
]

export const INSIGHT = "it turns at the bridge"

export function gradingMitski(rung: string): readonly string[] {
  return ["--target", ARTIST, "--slug", "mitski", "--grade", rung, "--reaction", REACTION]
}

export const SAYING_OF_SONG: readonly string[] = [
  "--target",
  SONG,
  "--slug",
  SONG_SLUG,
  "--insights",
  INSIGHT,
  "--personal-connections",
  "the drive home",
]

const GAVE_OUT = new Error("the grade landed and the push gave out")

export function gradingThrowing(wrote: readonly string[]) {
  return musicRate(
    ["--target", ARTIST, "--slug", RATED, "--grade", "A", "--reaction", REACTION],
    GIVEN,
    throwingAfter(wrote, GAVE_OUT)
  )
}
