import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const MODULE = "module"

const SERVER = "messages-mcp"

const CODE = "code"

const HOLDS = "ts"

const UNDER = "$INSTRUCTIONS/akasha/"

export function ranBy(given: string | Reading): string {
  const listed = listedAt(given, MODULE, SERVER)[0]
  if (listed === undefined) {
    throw new Error(`no \`${MODULE}\` page carries the slug \`${SERVER}\`, so this tells nothing`)
  }
  const at = besideAt(listed.path, CODE, HOLDS)
  if (at === null) throw new Error(`\`${listed.path}\` is no TypeScript file, and a page is one`)
  return at
}

export function settingsIn(given: string | Reading): string {
  const lines = [
    "{",
    '  "messages": {',
    '    "type": "stdio",',
    '    "command": "bun",',
    `    "args": ["run", "${UNDER}${ranBy(given)}"],`,
    '    "secretEnv": ["MCP_API_KEY"]',
    "  },",
    '  "playwright": {',
    '    "type": "stdio",',
    '    "command": "env",',
    '    "forwardEnv": ["PATH", "HOME"],',
    '    "storageState": "$HOME/.cache/claude-code/playwright-storage-state.json",',
    '    "args": [',
    '      "npx",',
    '      "-y",',
    '      "@playwright/mcp@0.0.76",',
    '      "--headless",',
    '      "--browser=chromium",',
    '      "--isolated",',
    '      "--storage-state=$STORAGE_STATE",',
    '      "--output-dir",',
    '      "$HOME/.playwright-mcp"',
    "    ]",
    "  }",
    "}",
  ]
  return `${lines.join("\n")}\n`
}
