import { BASE_DATA_MOTIFS } from "../knowledge-base-data-motifs/knowledge-base-data-motifs.module.code.ts"
import { BASE_DATA_PLANS } from "../knowledge-base-data-plans/knowledge-base-data-plans.module.code.ts"
import { BASE_DATA_RECIPES } from "../knowledge-base-data-recipes/knowledge-base-data-recipes.module.code.ts"
import { INTERNAL } from "../knowledge-state/knowledge-state.module.code.ts"
import type { MasterList } from "../knowledge-types/knowledge-types.module.code.ts"

const BASE_DATA: MasterList = {
  api: 101050,
  fieldSize: 3,
  timestamp: 1776111914,
  recipes: BASE_DATA_RECIPES,
  plans: BASE_DATA_PLANS,
  motifs: BASE_DATA_MOTIFS,
  grimoires: "nx5nxBnx6nx7nx8nx9nxAnxCnxDnxEnxFnxG",
  scripts:
    "ny5ny6ny7ny8ny9nyAnyBnyCnyDnyE000nyGnyHnyInyJnyKnyLnyMnyNnyO000nyQnyRnySnyTnyUnyVnyWnyXnyYnyZnyanybnycnydnyenyfnygnyhnyinyjnyk000nymnynnyonypnyqnyrnysnytnyunyvnywnyxnyynyzny#ny%nz0nz1nz2nz3nz4nz5nz6nz7nz8nz9onD",
  maxId_grimoires: 12,
  maxId_scripts: 70,
}

INTERNAL.BaseData = BASE_DATA
