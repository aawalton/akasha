import { dirname, relative } from "node:path"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt, valuesByPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { textAt, type Value } from "akasha/pages/value/page-value.module.code.ts"

const RECIPE = "container-recipe"

const OWN = "postgres-annual-dump-image"

const SCRIPT = "shell-script"

const DUMP = "annual-dump"

const SHELL = "shell"

type Held = {
  readonly path: string
  readonly value: Value
}

function pageOf(given: string | Reading, pageTypeSlug: string, slug: string): Held {
  const listed = listedAt(given, pageTypeSlug, slug)[0]
  if (listed === undefined) {
    throw new Error(
      `no \`${pageTypeSlug}\` page carries the slug \`${slug}\`, so this recipe copies nothing`
    )
  }
  const value = valuesByPath(given, pageTypeSlug).get(listed.path)
  if (value === undefined) {
    throw new Error(`\`${listed.path}\` is filed under \`${pageTypeSlug}\` and carries no value`)
  }
  return { path: listed.path, value }
}

function besideOf(page: Held, propertySlug: string): string {
  const held = textAt(page.value, exportedAs(propertySlug))
  if (held === null) {
    throw new Error(`\`${page.path}\` states no \`${propertySlug}\`, so nothing sits beside it`)
  }
  const at = besideAt(page.path, propertySlug, held)
  if (at === null) throw new Error(`\`${page.path}\` is no TypeScript file, and a page is one`)
  return at
}

function copiedIn(
  given: string | Reading,
  pageTypeSlug: string,
  slug: string,
  propertySlug: string
): string {
  const context = dirname(dirname(pageOf(given, RECIPE, OWN).path))
  return relative(context, besideOf(pageOf(given, pageTypeSlug, slug), propertySlug))
}

export function recipeIn(given: string | Reading): string {
  const lines = [
    "FROM postgres:18-alpine",
    "",
    "RUN set -eux; \\",
    "    apk add --no-cache rclone ca-certificates",
    "",
    `COPY ${copiedIn(given, SCRIPT, DUMP, SHELL)} /usr/local/bin/annual-dump.sh`,
    "RUN chmod +x /usr/local/bin/annual-dump.sh",
    "",
    'ENTRYPOINT ["/bin/sh"]',
    'CMD ["/usr/local/bin/annual-dump.sh"]',
  ]
  return `${lines.join("\n")}\n`
}
