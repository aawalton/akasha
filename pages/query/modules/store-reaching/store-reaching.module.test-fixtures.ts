import type { Sleeper } from "akasha/pages/query/modules/store-reaching/store-reaching.module.code.ts"
import { noOpAsync } from "akasha/utils/narrow/modules/no-op/no-op.module.code.ts"

export const noNap: Sleeper = noOpAsync
