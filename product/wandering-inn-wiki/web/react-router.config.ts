import { buildDirectoryAt } from "akasha/alan/harness/web-static-asset/modules/build-directory/build-directory.module.code.ts"
import type { Config } from "@react-router/dev/config"

export default {
  appDirectory: ".",
  ssr: true,
  buildDirectory: buildDirectoryAt(),
} satisfies Config
