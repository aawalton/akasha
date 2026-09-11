const AT_CP_SYNC = "/repo/akasha/code/tests/code-tests.module.code.ts:207:11"

const AT_WORLD_OF = "/repo/akasha/code/tests/code-tests.module.code.ts:244:7"

const AT_CHECK = "/repo/akasha/checks/one.code-check.code.ts:31:3"

export const PATHLESS =
  "Error: ENOENT: no such file or directory, open\n" +
  "    at cpSync (unknown)\n" +
  `    at ${AT_CP_SYNC}\n` +
  `    at worldOf (${AT_WORLD_OF})\n` +
  `    at ${AT_CHECK}\n`

export const FIRST_FRAME: readonly string[] = [AT_CP_SYNC]

export const EVERY_FRAME: readonly string[] = [AT_CP_SYNC, AT_WORLD_OF, AT_CHECK]
