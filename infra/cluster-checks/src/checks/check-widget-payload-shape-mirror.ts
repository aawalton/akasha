#!/usr/bin/env bun

import { readdirSync, readFileSync } from "node:fs"
import { dirname } from "node:path"
import { parseArgs, REPO_ROOT_FLAG } from "../lib/cli-args.ts"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"
import { PAYLOAD_MIRRORS, shapeMirrorMembers } from "../../../../tools/lib/check-workflow/widget-payload-shape-mirror"

const PREFIX = "[widget-payload-shape-mirror]"

// Every widget payload is an ios-component in akasha now. The shells' own
// `ios-widget` directories hold no Swift at all, so reading them would add
// nothing and would raise ENOENT the day they go.
const PAYLOAD_DIRS: readonly string[] = [
  "../akasha/akasha/code-system/ios-component/ios-components",
]

interface WidgetMirrorViolation {
  readonly subject: string
  readonly message: string
  readonly path: string
  readonly against: string
}

interface WidgetMirror {
  readonly label: string
  readonly site: string
  readonly examine: () => readonly WidgetMirrorViolation[]
}

function main(): undefined {
  const repoRoot =
    parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()
  const read = (relative: string): string => readFileSync(`${repoRoot}/${relative}`, "utf8")

  const siblingCache = new Map<string, ReadonlyMap<string, string>>()
  const siblings = (file: string): ReadonlyMap<string, string> => {
    const dir = dirname(file)
    const cached = siblingCache.get(dir)
    if (cached !== undefined) return cached
    const sources = new Map<string, string>()
    for (const entry of readdirSync(`${repoRoot}/${dir}`)) {
      if (!entry.endsWith(".ts") || entry.includes(".test.")) continue
      sources.set(`${dir}/${entry}`, read(`${dir}/${entry}`))
    }
    siblingCache.set(dir, sources)
    return sources
  }

  let members: readonly WidgetMirror[]
  try {
    const swiftSources = new Map<string, string>()
    for (const dir of PAYLOAD_DIRS) {
      for (const entry of readdirSync(`${repoRoot}/${dir}`, { recursive: true })) {
        const held = String(entry)
        if (!held.endsWith(".swift")) continue
        swiftSources.set(`${dir}/${held}`, read(`${dir}/${held}`))
      }
    }
    members = [
      ...shapeMirrorMembers({
        swiftSources,
        readCanonical: read,
        siblings,
        widgetDir: PAYLOAD_DIRS.join(" or "),
      }).map((member) => ({
        label: member.label,
        site: `${repoRoot}/${member.path}`,
        examine: () =>
          member.examine().map((v) => ({
            subject: `shape/${member.subject}/${v.member}`,
            message: v.message,
            path: member.path,
            against: member.against,
          })),
      })),
    ]
  } catch (error) {
    exitOnToolError({ error, prefix: PREFIX })
  }

  const { population, violations } = examinePopulation<WidgetMirror, WidgetMirrorViolation>({
    members,
    unit: "mirrors",
    labelOf: (mirror) => mirror.label,
    siteOf: (mirror) => mirror.site,
    examine: (mirror) => mirror.examine(),
    membership: {
      kind: "atLeast",
      members: PAYLOAD_MIRRORS.length,
      from:
        "one member per `PAYLOAD_MIRRORS` entry in `lib/widget-payload-shape-mirror.ts` — " +
        "a literal in this repo's source, which the widget directory read cannot shrink",
    },
  })

  exitOnResult<WidgetMirrorViolation>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: "each iOS widget payload must declare one field per name its wire vocabulary carries",
      successMessage: "every iOS widget payload is held against a declared wire vocabulary.",
      formatViolation: (v) => `${v.path} against ${v.against} — ${v.subject}: ${v.message}`,
    },
  })
}

main()
