export interface ZoneRaw {
  key: string
  quests: number[]
}

export interface GroupDungeonEntry {
  key: string
  id: number
  zone: string
  quest: number
}

export interface PublicDungeonEntry {
  key: string
  id: number
  zone: string
  achievement: number
}

export interface Tutorials {
  EO: number
  MO: number
  SO: number
  GO: number
  BO: number
}

export const ZONE_IDS: Record<string, number> = {
  AD0: 537,
  AD1: 381,
  AD2: 383,
  AD3: 108,
  AD4: 58,
  AD5: 382,
  DC0a: 535,
  DC0b: 534,
  DC1: 3,
  DC2: 19,
  DC3: 20,
  DC4: 104,
  DC5: 92,
  EP0b: 280,
  EP0a: 281,
  EP1: 41,
  EP2: 57,
  EP3: 117,
  EP4: 101,
  EP5: 103,
  CH: 347,
  CY: 181,
  CMT: 181,
  CL: 888,
  IC: 584,
  WR: 684,
  HB: 816,
  GC: 823,
  VV: 849,
  CC: 980,
  SU: 1011,
  MM: 726,
  NE: 1086,
  WP: 809,
  SE: 1133,
  WS: 1160,
  BGC: 1161,
  TR: 1207,
  BW: 1261,
  TD: 1286,
  HI: 1318,
  GY: 1383,
  AP: 1413,
  TP: 1414,
  EA: 1436,
  WW: 1443,
  SO: 1502,
}

export const RAW_ZONES: ZoneRaw[] = [
  { key: "WP", quests: [] },
  { key: "AD0", quests: [] },
  { key: "AD1", quests: [4222, 4345, 4261] },
  { key: "AD2", quests: [4868, 4386, 4885] },
  { key: "AD3", quests: [4750, 4765, 4690] },
  { key: "AD4", quests: [4337, 4452, 4143] },
  { key: "AD5", quests: [4712, 4479, 4720] },
  { key: "DC0b", quests: [] },
  { key: "DC0a", quests: [] },
  { key: "DC1", quests: [3006, 3235, 3267, 3379] },
  { key: "DC2", quests: [467, 1633, 575] },
  { key: "DC3", quests: [465, 4972, 4884] },
  { key: "DC4", quests: [2192, 2222, 2997] },
  { key: "DC5", quests: [4891, 4912, 4960] },
  { key: "EP0b", quests: [] },
  { key: "EP0a", quests: [] },
  { key: "EP1", quests: [3735, 3634, 3868] },
  { key: "EP2", quests: [3797, 3817, 3831] },
  { key: "EP3", quests: [4590, 4606, 3910] },
  { key: "EP4", quests: [4061, 4115, 4117] },
  { key: "EP5", quests: [3968, 4139, 4188] },
  { key: "CH", quests: [4602, 4730, 4758] },
  { key: "CY", quests: [] },
  { key: "CL", quests: [] },
  { key: "IC", quests: [5482] },
  { key: "WR", quests: [5447, 5468, 5481] },
  { key: "HB", quests: [5531, 5534, 5532, 5556, 5549, 5545] },
  { key: "GC", quests: [5540, 5595, 5599, 5596, 5567, 5597, 5598, 5600] },
  { key: "VV", quests: [6003, 5922, 5948] },
  { key: "CC", quests: [6050, 6057, 6063, 6025, 6052, 6046, 6047, 6048] },
  { key: "SU", quests: [6132, 6113, 6126] },
  { key: "MM", quests: [6246, 6266, 6241, 6259, 6243, 6244, 6245] },
  { key: "NE", quests: [6336, 6304, 6315] },
  { key: "SE", quests: [6401, 6409, 6394, 6399, 6403, 6404, 6393, 6397, 6402] },
  { key: "WS", quests: [6476, 6466, 6481] },
  { key: "TR", quests: [6550, 6551, 6547, 6548, 6554, 6566, 6552, 6560, 6570] },
  { key: "BW", quests: [6616, 6619, 6660] },
  { key: "TD", quests: [6723, 6724, 6707, 6708, 6699, 6700, 6696, 6697, 6693] },
  { key: "HI", quests: [6753, 6765, 6781, 6762, 6768] },
  { key: "GY", quests: [6849, 6850, 6855, 6859, 6852, 6853, 6847, 6848, 6894] },
  { key: "AP", quests: [6971, 6972, 6973, 6974, 6975, 6976, 7025, 6991, 6977] },
  { key: "WW", quests: [7071, 7072, 7073, 7074, 7075, 7076, 7077, 7078, 7220] },
  { key: "SO", quests: [7294, 7295, 7296, 7284, 7329, 7285, 7317, 7286, 7393] },
]

export const MAIN_QUESTS: number[] = [
  4296, 4831, 4474, 4552, 4607, 4764, 4836, 4837, 4867, 4832, 4847,
]

export const TUTORIALS: Tutorials = { EO: 6324, MO: 5804, SO: 6143, GO: 6455, BO: 6646 }

export const ENDLESS_ARCHIVE: number[] = [7061]

export const MAEL_ACHIEVEMENT = 1304

export const GROUP_DUNGEONS: GroupDungeonEntry[] = [
  { key: "BC1", id: 380, zone: "AD1", quest: 4107 },
  { key: "BC2", id: 935, zone: "AD1", quest: 4597 },
  { key: "EH1", id: 126, zone: "AD2", quest: 4336 },
  { key: "EH2", id: 931, zone: "AD2", quest: 4675 },
  { key: "CA1", id: 176, zone: "AD3", quest: 4778 },
  { key: "CA2", id: 681, zone: "AD3", quest: 5120 },
  { key: "TI", id: 131, zone: "AD4", quest: 4538 },
  { key: "SW", id: 31, zone: "AD5", quest: 4733 },
  { key: "SC1", id: 144, zone: "DC1", quest: 4054 },
  { key: "SC2", id: 936, zone: "DC1", quest: 4555 },
  { key: "WS1", id: 146, zone: "DC2", quest: 4246 },
  { key: "WS2", id: 933, zone: "DC2", quest: 4813 },
  { key: "CH1", id: 130, zone: "DC3", quest: 4379 },
  { key: "CH2", id: 932, zone: "DC3", quest: 5113 },
  { key: "VF", id: 22, zone: "DC4", quest: 4432 },
  { key: "BH", id: 38, zone: "DC5", quest: 4589 },
  { key: "FG1", id: 283, zone: "EP1", quest: 3993 },
  { key: "FG2", id: 934, zone: "EP1", quest: 4303 },
  { key: "DC1", id: 63, zone: "EP2", quest: 4145 },
  { key: "DC2", id: 930, zone: "EP2", quest: 4641 },
  { key: "AC", id: 148, zone: "EP3", quest: 4202 },
  { key: "DK", id: 449, zone: "EP4", quest: 4346 },
  { key: "BC", id: 64, zone: "EP5", quest: 4469 },
  { key: "VM", id: 11, zone: "CH", quest: 4822 },
  { key: "ICP", id: 678, zone: "CY", quest: 5136 },
  { key: "WGT", id: 688, zone: "CY", quest: 5342 },
  { key: "CS", id: 848, zone: "EP3", quest: 5702 },
  { key: "RM", id: 843, zone: "EP3", quest: 5403 },
  { key: "BF", id: 973, zone: "CL", quest: 5889 },
  { key: "FH", id: 974, zone: "CL", quest: 5891 },
  { key: "FL", id: 1009, zone: "DC5", quest: 6064 },
  { key: "SP", id: 1010, zone: "DC2", quest: 6065 },
  { key: "MHK", id: 1052, zone: "AD5", quest: 6186 },
  { key: "MOS", id: 1055, zone: "AD3", quest: 6188 },
  { key: "DoM", id: 1081, zone: "GC", quest: 6251 },
  { key: "FV", id: 1080, zone: "EP4", quest: 6249 },
  { key: "LM", id: 1123, zone: "AD2", quest: 6351 },
  { key: "MF", id: 1122, zone: "NE", quest: 6349 },
  { key: "IR", id: 1152, zone: "WR", quest: 6414 },
  { key: "UG", id: 1153, zone: "DC5", quest: 6416 },
  { key: "SG", id: 1197, zone: "BGC", quest: 6505 },
  { key: "CT", id: 1201, zone: "WS", quest: 6507 },
  { key: "BDV", id: 1228, zone: "GC", quest: 6576 },
  { key: "TC", id: 1229, zone: "EP2", quest: 6578 },
  { key: "RPB", id: 1267, zone: "DC1", quest: 6683 },
  { key: "TDC", id: 1268, zone: "BW", quest: 6685 },
  { key: "CA", id: 1301, zone: "SU", quest: 6740 },
  { key: "SR", id: 1302, zone: "DC3", quest: 6742 },
  { key: "ERE", id: 1360, zone: "HI", quest: 6835 },
  { key: "GD", id: 1361, zone: "HI", quest: 6837 },
  { key: "BS", id: 1389, zone: "EP1", quest: 6896 },
  { key: "SH", id: 1390, zone: "EP5", quest: 7027 },
  { key: "OP", id: 1470, zone: "TR", quest: 7105 },
  { key: "BV", id: 1471, zone: "WR", quest: 7155 },
  { key: "ER", id: 1496, zone: "WW", quest: 7235 },
  { key: "LS", id: 1497, zone: "HB", quest: 7237 },
  { key: "NC", id: 1551, zone: "SO", quest: 7320 },
  { key: "BGF", id: 1552, zone: "SO", quest: 7323 },
]

export const PUBLIC_DUNGEONS: PublicDungeonEntry[] = [
  { key: "AD1", id: 486, zone: "AD1", achievement: 468 },
  { key: "AD2", id: 124, zone: "AD2", achievement: 470 },
  { key: "AD3", id: 137, zone: "AD3", achievement: 445 },
  { key: "AD4", id: 138, zone: "AD4", achievement: 460 },
  { key: "AD5", id: 487, zone: "AD5", achievement: 469 },
  { key: "DC1", id: 284, zone: "DC1", achievement: 380 },
  { key: "DC2", id: 142, zone: "DC2", achievement: 714 },
  { key: "DC3", id: 162, zone: "DC3", achievement: 713 },
  { key: "DC4", id: 308, zone: "DC4", achievement: 707 },
  { key: "DC5", id: 169, zone: "DC5", achievement: 708 },
  { key: "EP1", id: 216, zone: "EP1", achievement: 379 },
  { key: "EP2", id: 306, zone: "EP2", achievement: 388 },
  { key: "EP3", id: 134, zone: "EP3", achievement: 372 },
  { key: "EP4", id: 339, zone: "EP4", achievement: 381 },
  { key: "EP5", id: 341, zone: "EP5", achievement: 371 },
  { key: "CH", id: 557, zone: "CH", achievement: 874 },
  { key: "VFW", id: 919, zone: "VV", achievement: 1855 },
  { key: "VNC", id: 918, zone: "VV", achievement: 1846 },
  { key: "WOO", id: 706, zone: "WR", achievement: 1238 },
  { key: "WRK", id: 705, zone: "WR", achievement: 1235 },
  { key: "SKW", id: 1020, zone: "SU", achievement: 2096 },
  { key: "SSH", id: 1021, zone: "SU", achievement: 2095 },
  { key: "RN", id: 1089, zone: "NE", achievement: 2444 },
  { key: "OC", id: 1090, zone: "NE", achievement: 2445 },
  { key: "LT", id: 1186, zone: "WS", achievement: 2714 },
  { key: "NK", id: 1187, zone: "BGC", achievement: 2715 },
  { key: "SH", id: 1260, zone: "BW", achievement: 2994 },
  { key: "ZA", id: 1259, zone: "BW", achievement: 2995 },
  { key: "GHB", id: 1338, zone: "HI", achievement: 3281 },
  { key: "SCC", id: 1337, zone: "HI", achievement: 3283 },
  { key: "GO", id: 1415, zone: "TP", achievement: 3658 },
  { key: "TU", id: 1416, zone: "AP", achievement: 3657 },
  { key: "LW", id: 1466, zone: "WW", achievement: 4000 },
  { key: "SI", id: 1467, zone: "WW", achievement: 4002 },
  { key: "DG", id: 1514, zone: "SO", achievement: 4264 },
  { key: "CG", id: 1530, zone: "SO", achievement: 4471 },
]
