import type { SetCategoryId } from "@akasha/temper-equipment/set-category-ids"
import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import { SETS_DATA_000 } from "../sets-data-000/sets-data-000.module.code.ts"
import { SETS_DATA_001 } from "../sets-data-001/sets-data-001.module.code.ts"
import { SETS_DATA_002 } from "../sets-data-002/sets-data-002.module.code.ts"
import { SETS_DATA_003 } from "../sets-data-003/sets-data-003.module.code.ts"
import { SETS_DATA_004 } from "../sets-data-004/sets-data-004.module.code.ts"
import { SETS_DATA_005 } from "../sets-data-005/sets-data-005.module.code.ts"
import { SETS_DATA_006 } from "../sets-data-006/sets-data-006.module.code.ts"
import { SETS_DATA_007 } from "../sets-data-007/sets-data-007.module.code.ts"
import { SETS_DATA_008 } from "../sets-data-008/sets-data-008.module.code.ts"
import { SETS_DATA_009 } from "../sets-data-009/sets-data-009.module.code.ts"
import { SETS_DATA_010 } from "../sets-data-010/sets-data-010.module.code.ts"
import { SETS_DATA_011 } from "../sets-data-011/sets-data-011.module.code.ts"
import { SETS_DATA_012 } from "../sets-data-012/sets-data-012.module.code.ts"
import { SETS_DATA_013 } from "../sets-data-013/sets-data-013.module.code.ts"
import { SETS_DATA_014 } from "../sets-data-014/sets-data-014.module.code.ts"
import { SETS_DATA_015 } from "../sets-data-015/sets-data-015.module.code.ts"
import { SETS_DATA_016 } from "../sets-data-016/sets-data-016.module.code.ts"
import { SETS_DATA_017 } from "../sets-data-017/sets-data-017.module.code.ts"
import { SETS_DATA_018 } from "../sets-data-018/sets-data-018.module.code.ts"
import { SETS_DATA_019 } from "../sets-data-019/sets-data-019.module.code.ts"
import { SETS_DATA_020 } from "../sets-data-020/sets-data-020.module.code.ts"
import { SETS_DATA_021 } from "../sets-data-021/sets-data-021.module.code.ts"
import { SETS_DATA_022 } from "../sets-data-022/sets-data-022.module.code.ts"
import { SETS_DATA_023 } from "../sets-data-023/sets-data-023.module.code.ts"
import { SETS_DATA_024 } from "../sets-data-024/sets-data-024.module.code.ts"
import { SETS_DATA_025 } from "../sets-data-025/sets-data-025.module.code.ts"
import { SETS_DATA_026 } from "../sets-data-026/sets-data-026.module.code.ts"
import { SETS_DATA_027 } from "../sets-data-027/sets-data-027.module.code.ts"
import { SETS_DATA_028 } from "../sets-data-028/sets-data-028.module.code.ts"
import { SETS_DATA_029 } from "../sets-data-029/sets-data-029.module.code.ts"
import { SETS_DATA_030 } from "../sets-data-030/sets-data-030.module.code.ts"
import { SETS_DATA_031 } from "../sets-data-031/sets-data-031.module.code.ts"
import { SETS_DATA_032 } from "../sets-data-032/sets-data-032.module.code.ts"
import { SETS_DATA_033 } from "../sets-data-033/sets-data-033.module.code.ts"
import { SETS_DATA_034 } from "../sets-data-034/sets-data-034.module.code.ts"
import { SETS_DATA_035 } from "../sets-data-035/sets-data-035.module.code.ts"
import { SETS_DATA_036 } from "../sets-data-036/sets-data-036.module.code.ts"
import { SETS_DATA_037 } from "../sets-data-037/sets-data-037.module.code.ts"
import { SETS_DATA_038 } from "../sets-data-038/sets-data-038.module.code.ts"
import { SETS_DATA_039 } from "../sets-data-039/sets-data-039.module.code.ts"
import { SETS_DATA_040 } from "../sets-data-040/sets-data-040.module.code.ts"
import { SETS_DATA_041 } from "../sets-data-041/sets-data-041.module.code.ts"
import { SETS_DATA_042 } from "../sets-data-042/sets-data-042.module.code.ts"
import { SETS_DATA_043 } from "../sets-data-043/sets-data-043.module.code.ts"
import { SETS_DATA_044 } from "../sets-data-044/sets-data-044.module.code.ts"
import { SETS_DATA_045 } from "../sets-data-045/sets-data-045.module.code.ts"
import { SETS_DATA_046 } from "../sets-data-046/sets-data-046.module.code.ts"
import { SETS_DATA_047 } from "../sets-data-047/sets-data-047.module.code.ts"
import { SETS_DATA_048 } from "../sets-data-048/sets-data-048.module.code.ts"
import { SETS_DATA_049 } from "../sets-data-049/sets-data-049.module.code.ts"
import { SETS_DATA_050 } from "../sets-data-050/sets-data-050.module.code.ts"
import { SETS_DATA_051 } from "../sets-data-051/sets-data-051.module.code.ts"
import { SETS_DATA_052 } from "../sets-data-052/sets-data-052.module.code.ts"
import { SETS_DATA_053 } from "../sets-data-053/sets-data-053.module.code.ts"
import { SETS_DATA_054 } from "../sets-data-054/sets-data-054.module.code.ts"
import { SETS_DATA_055 } from "../sets-data-055/sets-data-055.module.code.ts"
import { SETS_DATA_056 } from "../sets-data-056/sets-data-056.module.code.ts"
import { SETS_DATA_057 } from "../sets-data-057/sets-data-057.module.code.ts"
import { SETS_DATA_058 } from "../sets-data-058/sets-data-058.module.code.ts"
import { SETS_DATA_059 } from "../sets-data-059/sets-data-059.module.code.ts"
import { SETS_DATA_060 } from "../sets-data-060/sets-data-060.module.code.ts"
import { SETS_DATA_061 } from "../sets-data-061/sets-data-061.module.code.ts"
import { SETS_DATA_062 } from "../sets-data-062/sets-data-062.module.code.ts"
import { SETS_DATA_063 } from "../sets-data-063/sets-data-063.module.code.ts"
import { SETS_DATA_064 } from "../sets-data-064/sets-data-064.module.code.ts"
import { SETS_DATA_065 } from "../sets-data-065/sets-data-065.module.code.ts"
import { SETS_DATA_066 } from "../sets-data-066/sets-data-066.module.code.ts"
import { SETS_DATA_067 } from "../sets-data-067/sets-data-067.module.code.ts"
import { SETS_DATA_068 } from "../sets-data-068/sets-data-068.module.code.ts"
import { SETS_DATA_069 } from "../sets-data-069/sets-data-069.module.code.ts"
import { SETS_DATA_070 } from "../sets-data-070/sets-data-070.module.code.ts"
import { SETS_DATA_071 } from "../sets-data-071/sets-data-071.module.code.ts"
import { SETS_DATA_072 } from "../sets-data-072/sets-data-072.module.code.ts"
import { SETS_DATA_073 } from "../sets-data-073/sets-data-073.module.code.ts"
import { SETS_DATA_074 } from "../sets-data-074/sets-data-074.module.code.ts"
import { SETS_DATA_075 } from "../sets-data-075/sets-data-075.module.code.ts"
import { SETS_DATA_076 } from "../sets-data-076/sets-data-076.module.code.ts"
import { SETS_DATA_077 } from "../sets-data-077/sets-data-077.module.code.ts"
import { SETS_DATA_078 } from "../sets-data-078/sets-data-078.module.code.ts"
import { SETS_DATA_079 } from "../sets-data-079/sets-data-079.module.code.ts"
import { SETS_DATA_080 } from "../sets-data-080/sets-data-080.module.code.ts"
import { SETS_DATA_081 } from "../sets-data-081/sets-data-081.module.code.ts"
import { SETS_DATA_082 } from "../sets-data-082/sets-data-082.module.code.ts"
import { SETS_DATA_083 } from "../sets-data-083/sets-data-083.module.code.ts"
import { SETS_DATA_084 } from "../sets-data-084/sets-data-084.module.code.ts"
import { SETS_DATA_085 } from "../sets-data-085/sets-data-085.module.code.ts"
import { SETS_DATA_086 } from "../sets-data-086/sets-data-086.module.code.ts"
import { SETS_DATA_087 } from "../sets-data-087/sets-data-087.module.code.ts"
import { SETS_DATA_088 } from "../sets-data-088/sets-data-088.module.code.ts"
import { SETS_DATA_089 } from "../sets-data-089/sets-data-089.module.code.ts"
import { SETS_DATA_090 } from "../sets-data-090/sets-data-090.module.code.ts"
import { SETS_DATA_091 } from "../sets-data-091/sets-data-091.module.code.ts"
import { SETS_DATA_092 } from "../sets-data-092/sets-data-092.module.code.ts"
import { SETS_DATA_093 } from "../sets-data-093/sets-data-093.module.code.ts"
import { SETS_DATA_094 } from "../sets-data-094/sets-data-094.module.code.ts"
import { SETS_DATA_095 } from "../sets-data-095/sets-data-095.module.code.ts"
import { SETS_DATA_096 } from "../sets-data-096/sets-data-096.module.code.ts"
import { SETS_DATA_097 } from "../sets-data-097/sets-data-097.module.code.ts"
import { SETS_DATA_098 } from "../sets-data-098/sets-data-098.module.code.ts"
import { SETS_DATA_099 } from "../sets-data-099/sets-data-099.module.code.ts"
import { SETS_DATA_100 } from "../sets-data-100/sets-data-100.module.code.ts"
import { SETS_DATA_101 } from "../sets-data-101/sets-data-101.module.code.ts"
import { SETS_DATA_102 } from "../sets-data-102/sets-data-102.module.code.ts"
import { SETS_DATA_103 } from "../sets-data-103/sets-data-103.module.code.ts"
import { SETS_DATA_104 } from "../sets-data-104/sets-data-104.module.code.ts"
import { SETS_DATA_105 } from "../sets-data-105/sets-data-105.module.code.ts"
import { SETS_DATA_106 } from "../sets-data-106/sets-data-106.module.code.ts"
import { SETS_DATA_107 } from "../sets-data-107/sets-data-107.module.code.ts"
import { SETS_DATA_108 } from "../sets-data-108/sets-data-108.module.code.ts"
import { SETS_DATA_109 } from "../sets-data-109/sets-data-109.module.code.ts"
import { SETS_DATA_110 } from "../sets-data-110/sets-data-110.module.code.ts"
import { SETS_DATA_111 } from "../sets-data-111/sets-data-111.module.code.ts"
import { SETS_DATA_112 } from "../sets-data-112/sets-data-112.module.code.ts"
import { SETS_DATA_113 } from "../sets-data-113/sets-data-113.module.code.ts"
import { SETS_DATA_114 } from "../sets-data-114/sets-data-114.module.code.ts"
import { SETS_DATA_115 } from "../sets-data-115/sets-data-115.module.code.ts"
import { SETS_DATA_116 } from "../sets-data-116/sets-data-116.module.code.ts"
import { SETS_DATA_117 } from "../sets-data-117/sets-data-117.module.code.ts"
import { SETS_DATA_118 } from "../sets-data-118/sets-data-118.module.code.ts"
import { SETS_DATA_119 } from "../sets-data-119/sets-data-119.module.code.ts"
import { SETS_DATA_120 } from "../sets-data-120/sets-data-120.module.code.ts"
import { SETS_DATA_121 } from "../sets-data-121/sets-data-121.module.code.ts"
import { SETS_DATA_122 } from "../sets-data-122/sets-data-122.module.code.ts"
import { SETS_DATA_123 } from "../sets-data-123/sets-data-123.module.code.ts"

const SETS_ALL_ROWS: readonly SetTemplate[] = [
  ...SETS_DATA_000,
  ...SETS_DATA_001,
  ...SETS_DATA_002,
  ...SETS_DATA_003,
  ...SETS_DATA_004,
  ...SETS_DATA_005,
  ...SETS_DATA_006,
  ...SETS_DATA_007,
  ...SETS_DATA_008,
  ...SETS_DATA_009,
  ...SETS_DATA_010,
  ...SETS_DATA_011,
  ...SETS_DATA_012,
  ...SETS_DATA_013,
  ...SETS_DATA_014,
  ...SETS_DATA_015,
  ...SETS_DATA_016,
  ...SETS_DATA_017,
  ...SETS_DATA_018,
  ...SETS_DATA_019,
  ...SETS_DATA_020,
  ...SETS_DATA_021,
  ...SETS_DATA_022,
  ...SETS_DATA_023,
  ...SETS_DATA_024,
  ...SETS_DATA_025,
  ...SETS_DATA_026,
  ...SETS_DATA_027,
  ...SETS_DATA_028,
  ...SETS_DATA_029,
  ...SETS_DATA_030,
  ...SETS_DATA_031,
  ...SETS_DATA_032,
  ...SETS_DATA_033,
  ...SETS_DATA_034,
  ...SETS_DATA_035,
  ...SETS_DATA_036,
  ...SETS_DATA_037,
  ...SETS_DATA_038,
  ...SETS_DATA_039,
  ...SETS_DATA_040,
  ...SETS_DATA_041,
  ...SETS_DATA_042,
  ...SETS_DATA_043,
  ...SETS_DATA_044,
  ...SETS_DATA_045,
  ...SETS_DATA_046,
  ...SETS_DATA_047,
  ...SETS_DATA_048,
  ...SETS_DATA_049,
  ...SETS_DATA_050,
  ...SETS_DATA_051,
  ...SETS_DATA_052,
  ...SETS_DATA_053,
  ...SETS_DATA_054,
  ...SETS_DATA_055,
  ...SETS_DATA_056,
  ...SETS_DATA_057,
  ...SETS_DATA_058,
  ...SETS_DATA_059,
  ...SETS_DATA_060,
  ...SETS_DATA_061,
  ...SETS_DATA_062,
  ...SETS_DATA_063,
  ...SETS_DATA_064,
  ...SETS_DATA_065,
  ...SETS_DATA_066,
  ...SETS_DATA_067,
  ...SETS_DATA_068,
  ...SETS_DATA_069,
  ...SETS_DATA_070,
  ...SETS_DATA_071,
  ...SETS_DATA_072,
  ...SETS_DATA_073,
  ...SETS_DATA_074,
  ...SETS_DATA_075,
  ...SETS_DATA_076,
  ...SETS_DATA_077,
  ...SETS_DATA_078,
  ...SETS_DATA_079,
  ...SETS_DATA_080,
  ...SETS_DATA_081,
  ...SETS_DATA_082,
  ...SETS_DATA_083,
  ...SETS_DATA_084,
  ...SETS_DATA_085,
  ...SETS_DATA_086,
  ...SETS_DATA_087,
  ...SETS_DATA_088,
  ...SETS_DATA_089,
  ...SETS_DATA_090,
  ...SETS_DATA_091,
  ...SETS_DATA_092,
  ...SETS_DATA_093,
  ...SETS_DATA_094,
  ...SETS_DATA_095,
  ...SETS_DATA_096,
  ...SETS_DATA_097,
  ...SETS_DATA_098,
  ...SETS_DATA_099,
  ...SETS_DATA_100,
  ...SETS_DATA_101,
  ...SETS_DATA_102,
  ...SETS_DATA_103,
  ...SETS_DATA_104,
  ...SETS_DATA_105,
  ...SETS_DATA_106,
  ...SETS_DATA_107,
  ...SETS_DATA_108,
  ...SETS_DATA_109,
  ...SETS_DATA_110,
  ...SETS_DATA_111,
  ...SETS_DATA_112,
  ...SETS_DATA_113,
  ...SETS_DATA_114,
  ...SETS_DATA_115,
  ...SETS_DATA_116,
  ...SETS_DATA_117,
  ...SETS_DATA_118,
  ...SETS_DATA_119,
  ...SETS_DATA_120,
  ...SETS_DATA_121,
  ...SETS_DATA_122,
  ...SETS_DATA_123,
]

function keyedById(rows: readonly SetTemplate[]): Record<SetId, SetTemplate> {
  const keyed: Partial<Record<SetId, SetTemplate>> = {}
  for (const row of rows) keyed[row.id] = row
  return keyed as Record<SetId, SetTemplate>
}

export const setsAll: DataFile<SetId, SetTemplate, SetCategoryId> = createDataFile<SetTemplate>()(
  keyedById(SETS_ALL_ROWS)
)

export function isSetsAllId(value: string): value is SetId {
  return setsAll.has(value)
}
