import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import { pageStem } from "@akasha/named-for/page-stem"
import { akashaRoot } from "@akasha/pages/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import { readDifficulty } from "../../../../commands/track/session-leveling/session-leveling.module.code.ts"
import { composedFor } from "../../../../pages/system-service/page-composing/page-composing.module.code.ts"
import { landTracking } from "../../tracking-landing/tracking-landing.module.code.ts"

export const summary =
  "Set an activity's default difficulty, which is what a session whose title names it rates at"

const PAGE_TYPE = "session-activity"

const WRITER = "ops-tracking"

export const help: CommandHelp = {
  flags: [
    {
      name: "--title",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Activity name, matched within a session title (required)",
    },
    {
      name: "--difficulty",
      argLabel: "<level>",
      valueShape: "token",
      description: "Difficulty level 0…5 in half steps, which a matching session rates at",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "title",
      required: false,
      aliasOfFlag: "--title",
      description: "Activity name, matched within a session title",
    },
  ],
  exits: [
    { code: 0, meaning: "activity default written — created, or patched in place" },
    { code: 1, meaning: "missing title, missing or unreadable --difficulty, or bad input" },
    { code: 3, meaning: "the page did not land" },
  ],
  examples: [
    'ops tracking activity-set "Read" --difficulty 1',
    'ops tracking activity-set --title "Piano" --difficulty 3',
  ],
}

export type Standing = {
  readonly id: string
  readonly slug: string
  readonly title: string
}

export function activitiesFiled(root: string): readonly Standing[] {
  const asked = asking(root, {
    pageTypeSlug: PAGE_TYPE,
    keys: ["id", "slug", "title"],
  } as never)
  if ("refused" in asked) {
    throw new Error(`reading the activities that already stand: ${asked.refused}`)
  }
  const rows: Standing[] = []
  for (const one of asked.rows) {
    const row = one as Readonly<Record<string, unknown>>
    rows.push({
      id: typeof row["id"] === "string" ? row["id"] : "",
      slug: typeof row["slug"] === "string" ? row["slug"] : "",
      title: typeof row["title"] === "string" ? row["title"] : "",
    })
  }
  return rows
}

export function activityNamed(standing: readonly Standing[], title: string): Standing | undefined {
  const wanted = pageStem(title)
  return standing.find((one) => pageStem(one.title) === wanted || one.slug === wanted)
}

/** The composed page landed, with no scratch file between the body and the landing. */
async function written(
  root: string,
  path: string,
  content: string,
  message: string
): Promise<void> {
  const said = await landTracking({ root, changes: [{ path, body: content }], message })
  if ("refused" in said) throw new Error(`the tracking landing refused: ${said.refused}`)
}

export default async function trackingActivitySet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const titleRaw = parsed.string("--title")
  if (titleRaw === undefined || titleRaw.trim() === "") {
    throw new Error(
      'an activity --title is required (e.g. `ops tracking activity-set "Read" --difficulty 1`)'
    )
  }
  const title = titleRaw.trim()
  const difficultyRaw = parsed.string("--difficulty")
  if (difficultyRaw === undefined || difficultyRaw.trim() === "") {
    throw new Error(
      "--difficulty is required, which is what a session naming this activity rates at"
    )
  }
  const read = readDifficulty(difficultyRaw)
  if (read.read === "refused") throw new Error(read.saying)
  const difficulty = Number(read.level)
  const json = parsed.boolean("--json")

  const root = akashaRoot()
  const held = activityNamed(activitiesFiled(root), title)
  const slug = held?.slug === undefined || held.slug === "" ? pageStem(title) : held.slug
  const id = held?.id === undefined || held.id === "" ? Bun.randomUUIDv7() : held.id

  const composed = composedFor(root, {
    pageTypeSlug: PAGE_TYPE,
    slug,
    values: { id, pageTypeSlug: PAGE_TYPE, slug, title, defaultDifficulty: difficulty },
  })
  if ("refused" in composed) throw new Error(`the activity did not compose: ${composed.refused}`)

  await written(root, composed.put.path, composed.put.content, `${WRITER}: the activity ${slug}`)

  const envelope = { id, at: composed.put.path, created: held === undefined, title, difficulty }
  if (json) {
    process.stdout.write(`${JSON.stringify(envelope)}\n`)
    return
  }
  process.stdout.write(
    `id\t${id}\nat\t${composed.put.path}\ntitle\t${title}\ndifficulty\t${String(difficulty)}\n`
  )
}
