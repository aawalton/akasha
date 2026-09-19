import { module } from "akasha/code/module/module.page-type.ts"
import { serviceRunning } from "akasha/infrastructure/service/workstation/modules/service-running/service-running.module.ts"

export const NOWHERE = "module/no-module-is-filed-under-this"

export const RUNNER = `${module.slug}/${serviceRunning.slug}` as const

export const HELD_TREE = "/held/tree"
