import type { Sleeper } from "akasha/pages/query/store-reaching/store-reaching.module.code.ts"
import { noOpAsync } from "akasha/utils/narrow/no-op/no-op.module.code.ts"

export const noNap: Sleeper = noOpAsync
