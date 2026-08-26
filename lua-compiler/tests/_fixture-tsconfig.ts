import * as path from "node:path"
import * as ts from "typescript"
import { z } from "zod"

const ADDONS_BASE_PATH = path.resolve(import.meta.dir, "../vendor/addons/tsconfig.base.json")
const MAX_EXTENDS_HOPS = 10

const ADDONS_BASE_SCHEMA = z
  .object({
    tstl: z
      .object({
        luaTarget: z.string(),
        noImplicitSelf: z.boolean(),
      })
      .passthrough(),
  })
  .passthrough()

const EXTENDS_LINK_SCHEMA = z
  .object({
    extends: z.string().optional(),
    compilerOptions: z.object({ strict: z.boolean().optional() }).passthrough().optional(),
  })
  .passthrough()

function readTsconfig(filePath: string): unknown {
  const { config, error } = ts.readConfigFile(filePath, ts.sys.readFile)
  if (error !== undefined) {
    const msg =
      typeof error.messageText === "string" ? error.messageText : error.messageText.messageText
    throw new Error(`failed to read ${filePath}: ${msg}`)
  }
  return config
}

function resolveStrict(startPath: string): boolean {
  let current = startPath
  for (let hop = 0; hop < MAX_EXTENDS_HOPS; hop++) {
    const parsed = EXTENDS_LINK_SCHEMA.parse(readTsconfig(current))
    const strict = parsed.compilerOptions?.strict
    if (strict !== undefined) return strict
    if (parsed.extends === undefined) {
      throw new Error(`no compilerOptions.strict found on the extends chain from ${startPath}`)
    }
    current = path.resolve(path.dirname(current), parsed.extends)
  }
  throw new Error(`extends chain from ${startPath} exceeded ${MAX_EXTENDS_HOPS} hops`)
}

export interface FixtureTsconfigOverrides {
  readonly compilerOptions?: Record<string, unknown>
  readonly tstl?: Record<string, unknown>
}

export interface FixtureTsconfig {
  readonly compilerOptions: Record<string, unknown>
  readonly tstl: Record<string, unknown>
  readonly include: readonly string[]
}

export function fixtureTsconfig(overrides?: FixtureTsconfigOverrides): FixtureTsconfig {
  const addonsBase = ADDONS_BASE_SCHEMA.parse(readTsconfig(ADDONS_BASE_PATH))
  return {
    compilerOptions: {
      target: "esnext",
      module: "esnext",
      moduleResolution: "bundler",
      strict: resolveStrict(ADDONS_BASE_PATH),
      skipLibCheck: true,
      rootDir: ".",
      outDir: "./lua-out",
      types: [],
      ...overrides?.compilerOptions,
    },
    tstl: {
      luaTarget: addonsBase.tstl.luaTarget,
      noImplicitSelf: addonsBase.tstl.noImplicitSelf,
      luaBundle: "out.lua",
      luaBundleEntry: "./src/main.ts",
      luaLibImport: "inline",
      ...overrides?.tstl,
    },
    include: ["src/**/*.ts"],
  }
}
