import { noOpAsync } from "akasha/utils/narrow/no-op/no-op.module.code.ts"
import type { Sleeper } from "./store-reaching.module.code.ts"

export const noNap: Sleeper = noOpAsync
