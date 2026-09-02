import { join } from "node:path"
import { z } from "zod"

const WATCHER_DIR_SCHEMA = z.string().min(1).default("watcher")
const WATCHER_DIR_RAW = WATCHER_DIR_SCHEMA.parse(process.env["WATCHER_DIR"])

export const WATCHER_DIR = WATCHER_DIR_RAW.startsWith("/")
  ? WATCHER_DIR_RAW
  : join(process.cwd(), WATCHER_DIR_RAW)
