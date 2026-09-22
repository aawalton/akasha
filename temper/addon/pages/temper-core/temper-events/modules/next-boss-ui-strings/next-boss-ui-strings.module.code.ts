import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const STRINGS: Record<string, string> = {
  SI_TEMPER_NEXTBOSS_AMONCRUL: "Amoncrul",
  SI_TEMPER_NEXTBOSS_THIRSK: "Baron Thirsk",
  SI_TEMPER_NEXTBOSS_GLORGOLOCH: "Glorgoloch the Destroyer",
  SI_TEMPER_NEXTBOSS_CHARR: "Immolator Charr",
  SI_TEMPER_NEXTBOSS_KHROGO: "King Khrogo",
  SI_TEMPER_NEXTBOSS_MALYGDA: "Lady Malygda",
  SI_TEMPER_NEXTBOSS_MAZALUHAD: "Mazaluhad",
  SI_TEMPER_NEXTBOSS_NUNATAK: "Nunatak",
  SI_TEMPER_NEXTBOSS_MATRON: "The Screeching Matron",
  SI_TEMPER_NEXTBOSS_VOLGHASS: "Volghass",
  SI_TEMPER_NEXTBOSS_YSENDA: "Ysenda Resplendent",
  SI_TEMPER_NEXTBOSS_ZOAL: "Zoal the Ever-Wakeful",
  SI_TEMPER_NEXTBOSS_MOLAG: "Simulacrum of Molag Bal",

  SI_ICTHENEXTBOSS_NOBLESDISTRICT: "5-Nobles District",
  SI_ICTHENEXTBOSS_ARENADISTRICT: "2-Arena District",
  SI_ICTHENEXTBOSS_TEMPLEDISTRICT: "4-Temple District",
  SI_ICTHENEXTBOSS_ARBORETUMDISTRICT: "3-Arboretum District",
  SI_ICTHENEXTBOSS_MEMORIALDISTRICT: "1-Memorial District",
  SI_ICTHENEXTBOSS_ELVENGARDENSDISTRICT: "6-Elven Gardens District",
  SI_ICTHENEXTBOSS_CAN: "0-Imperial Sewers",

  SI_BINDING_NAME_SI_ICTHENEXTBOSS_NOBLESDISTRICT: "5-Nobles District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_ARENADISTRICT: "2-Arena District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_TEMPLEDISTRICT: "4-Temple District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_ARBORETUMDISTRICT: "3-Arboretum District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_MEMORIALDISTRICT: "1-Memorial District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_ELVENGARDENSDISTRICT: "6-Elven Gardens District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_CAN: "0-Imperial Sewers",

  SI_TEMPER_NEXTBOSS_GUI_WIDTH: "230",
  SI_TEMPER_NEXTBOSS_OPTION_DESCRIPTION: "Tracks spawn times of bosses in Imperial City.",
  SI_TEMPER_NEXTBOSS_OPTION_TIMETABLE: "Table with spawntimes",
  SI_TEMPER_NEXTBOSS_OPTION_MAPTIMERS: "Spawntimes on IC map",
  SI_TEMPER_NEXTBOSS_OPTION_MAPTIMERS_TOOLTIP:
    "This will disable zoom on Imperial City map.\nDoes not work with Gamepad-Mode!",
  SI_TEMPER_NEXTBOSS_OPTION_EVENT_TIMERS: "Event timers (7 minutes)",
  SI_TEMPER_NEXTBOSS_OPTION_RUN_DIRECTION: "Run direction counterclockwise",
  SI_BINDING_NAME_SI_RUN_DIRECTION: "Run direction counterclockwise",
}

export function makeUiStrings(this: void): undefined {
  for (const [key, value] of Object.entries(STRINGS)) {
    ZO_CreateStringId(key, value)
  }
  return undefined
}
