import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"

export interface EmailMessage {
  readonly id: string
  readonly subject: string
  readonly date: string
  readonly body: string
}

const FETCH_WIDTH = 8

export async function ops(args: readonly string[]): Promise<string> {
  const child = Bun.spawn(["ops", ...args], { stdout: "pipe", stderr: "pipe" })
  const [out, err, code] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ])
  if (code !== 0) throw new Error(`ops ${args.join(" ")} exited ${code}\n${err.trim()}`)
  return out
}

export async function cachedMessages(options: {
  readonly query: string
  readonly cacheDir: string
  readonly label: string
}): Promise<readonly EmailMessage[]> {
  mkdirSync(options.cacheDir, { recursive: true })
  const listed = JSON.parse(
    await ops(["email", "messages", "list", "--query", options.query, "--max", "500"])
  ) as { id: string }[]
  const ids = listed.map((m) => m.id)
  const wanted = ids.filter((id) => !existsSync(`${options.cacheDir}/${id}.json`))
  console.log(`gmail: ${ids.length} ${options.label}, ${wanted.length} to fetch`)
  for (let at = 0; at < wanted.length; at += FETCH_WIDTH) {
    await Promise.all(
      wanted.slice(at, at + FETCH_WIDTH).map(async (id) => {
        writeFileSync(
          `${options.cacheDir}/${id}.json`,
          await ops(["email", "messages", "get", "--message", id])
        )
      })
    )
    if (at % 80 === 0 && at > 0) console.log(`  fetched ${at} of ${wanted.length}`)
  }
  return ids.map(
    (id) => JSON.parse(readFileSync(`${options.cacheDir}/${id}.json`, "utf8")) as EmailMessage
  )
}
