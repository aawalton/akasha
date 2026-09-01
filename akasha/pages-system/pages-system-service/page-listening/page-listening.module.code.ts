import { listedAt } from "../../indexes/index-reading/index-reading.module.code.ts"
import { numberAt, valueAt } from "../../page/page-value/page-value.module.code.ts"
import { answering } from "../page-serving/page-serving.module.code.ts"

export const SERVICE_SLUG = "page-query-service"
export const SERVICE_PAGE_TYPE = "workstation-service"

export type Listening = {
  readonly root: string
  readonly port: number
}

export function portFor(root: string): number | null {
  const standing = listedAt(root, SERVICE_PAGE_TYPE, SERVICE_SLUG)
  const one = standing[0]
  if (one === undefined) return null
  const value = valueAt(one.path, root)
  return value === null ? null : numberAt(value, "port")
}

export function serverFor(given: Listening) {
  return Bun.serve({
    port: given.port,
    fetch: (request) => answering({ root: given.root }, request),
  })
}

if (import.meta.main) {
  const root = process.cwd()
  const port = portFor(root)
  if (port === null) {
    process.stderr.write(
      `no page is slugged ${SERVICE_SLUG} under ${SERVICE_PAGE_TYPE}, or it states no port\n`
    )
    process.exit(2)
  }
  const server = serverFor({ root, port })
  process.stdout.write(`page queries are answered at ${server.url}\n`)
}
