import { dirname, relative } from "node:path"
import {
  besideOf,
  pageOf,
} from "akasha/infrastructure/container-image/recipe-page/recipe-page.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const RECIPE = "container-recipe"

const OWN = "postgres-annual-dump-image"

const SCRIPT = "shell-script"

const DUMP = "annual-dump"

const SHELL = "shell"

function copiedIn(
  given: string | Reading,
  pageTypeSlug: string,
  slug: string,
  propertySlug: string
): string {
  const context = dirname(dirname(pageOf(given, RECIPE, OWN).path))
  return relative(context, besideOf(pageOf(given, pageTypeSlug, slug), propertySlug))
}

export function bodyIn(given: string | Reading): string {
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
