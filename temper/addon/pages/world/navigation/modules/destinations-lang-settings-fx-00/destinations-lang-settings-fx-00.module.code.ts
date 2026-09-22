import { achievementName } from "akasha/temper/addon/pages/world/navigation/modules/destinations-data-runtime/destinations-data-runtime.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export const SETTINGS_STRINGS_00: Record<string, string> = {
  SI_TEMPER_DESTINATIONS_COMMANDS: "Lista komend Destinations:",
  SI_TEMPER_DESTINATIONS_COMMAND_DHLP: "/dhlp (Pomoc Destinations): Właśnie jej użyłeś;)",
  SI_TEMPER_DESTINATIONS_COMMAND_DSET:
    "/ dset (Ustawienia Destinations): Otwiera okno Ustawienia Destinations.",
  SI_TEMPER_DESTINATIONS_FILTER_AYLEID: "(Dest) Ayleidzkie studnie",
  SI_TEMPER_DESTINATIONS_FILTER_BORDER: "(Dest) Craglorn Border Line",
  SI_TEMPER_DESTINATIONS_FILTER_BRAWL: "(Dest) " + zo_strformat(achievementName(1247)),
  SI_TEMPER_DESTINATIONS_FILTER_BRAWL_DONE:
    "(Dest) " + zo_strformat(achievementName(1247)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING: "(Dest) " + zo_strformat(achievementName(1349)),
  SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING_DONE:
    "(Dest) " + zo_strformat(achievementName(1349)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_CHAMPION: "(Dest) Czempiony w lochach",
  SI_TEMPER_DESTINATIONS_FILTER_CHAMPION_DONE: "(Dest) Ukończone czempiony w lochach",
  SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE: "(Dest) Przedmioty kolekcjonerskie",
  SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE_DONE: "(Dest) Ukończone przedmioty kolekcjonerskie",
  SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE: "(Dest) " + zo_strformat(achievementName(1383)),
  SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE_DONE:
    "(Dest) " + zo_strformat(achievementName(1383)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_DEADLANDS_ENTRANCE: "(Dest) Deadlands Entrance",
  SI_TEMPER_DESTINATIONS_FILTER_DWEMER: "(Dest) Dwemerowe ruiny",
  SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS: "(Dest) " + zo_strformat(achievementName(1121)),
  SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS_DONE:
    "(Dest) " + zo_strformat(achievementName(1121)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_FISHING: "(Dest) Łowiska",
  SI_TEMPER_DESTINATIONS_FILTER_FISHING_DONE: "(Dest) Ukończone łowiska",
  SI_TEMPER_DESTINATIONS_FILTER_HIGHISLE_DRUIDICSHRINE: "(Dest) Druidic Shrine",
  SI_TEMPER_DESTINATIONS_FILTER_KNOWN: "(Dest) Znane POI",
  SI_TEMPER_DESTINATIONS_FILTER_MAIQ: "(Dest) " + zo_strformat(achievementName(872)),
  SI_TEMPER_DESTINATIONS_FILTER_MAIQ_DONE:
    "(Dest) " + zo_strformat(achievementName(872)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER: "(Dest) " + zo_strformat(achievementName(406)),
  SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER_DONE:
    "(Dest) " + zo_strformat(achievementName(406)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_ON_ME: "(Dest) " + zo_strformat(achievementName(704)),
  SI_TEMPER_DESTINATIONS_FILTER_ON_ME_DONE:
    "(Dest) " + zo_strformat(achievementName(704)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_OTHER: "(Dest) Inne osiągnięcia",
  SI_TEMPER_DESTINATIONS_FILTER_OTHER_DONE: "(Dest) Inne osiągnięcia ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_PATRON: "(Dest) " + zo_strformat(achievementName(1316)),
  SI_TEMPER_DESTINATIONS_FILTER_PATRON_DONE:
    "(Dest) " + zo_strformat(achievementName(1316)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER: "(Dest) " + zo_strformat(achievementName(716)),
  SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER_DONE:
    "(Dest) " + zo_strformat(achievementName(716)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER: "(Dest) " + zo_strformat(achievementName(1250)),
  SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER_DONE:
    "(Dest) " + zo_strformat(achievementName(1250)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_UNKNOWN: "(Dest) Nieznane POI",
  SI_TEMPER_DESTINATIONS_FILTER_VAMPIRE_ALTAR: "(Dest) Ołtarze Wampirów",
  SI_TEMPER_DESTINATIONS_FILTER_WEREWOLF_SHRINE: "(Dest) Kapliczka wilkołaków",
  SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER: "(Dest) " + zo_strformat(achievementName(1331)),
  SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER_DONE:
    "(Dest) " + zo_strformat(achievementName(1331)) + " ukończone",
  SI_TEMPER_DESTINATIONS_FILTER_WWVAMP: "(Dest) Wampiry i Wilkołaki",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_COMPASS_DIST: "Dystans do punktów na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_COMPASS_TOGGLE: "Pokaż osiągnięcia na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_PIN_LAYER: "Pin layer for all Achievements",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_BRAWL_HEADER: "Ostatnia bójka",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_BREAKING_HEADER: "Włamanie i wtargnięcie",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE: "Zone pin to Front",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE_TT:
    "This will toggle if ZONE pins (if active) should be shown in front of dungeon pins or not",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_PIN_HEADER: "czempion/czempionka lochów",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_PIN_SIZE:
    "Wielkość punktów dla czempionów w lochach",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE: "Pokaż na mapach regionu",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE_TT:
    "Służy do włączenia lub wyłączenia Czempionów (bossy w lochach solo) na mapie regionu",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CUTPURSE_HEADER: "Nadkieszonkowiec",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_EARTHLYPOS_HEADER: "Ziemskie dobytki",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_GLOBAL_HEADER: "Pozycja osiągnięcia - Globalne ustawienia",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_GLOBAL_HEADER_TT:
    "‎Podmenu obejmuje ustawienia ‎‎osiągnięć globalnych‎",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_HEADER: "Pozycja osiągnięć",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_HEADER_TT:
    "‎Podmenu to obejmuje większość osiągnięć w grze (zbyt wiele, aby je wymieniać)‎",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_MAIQ_HEADER: "Lubię M'aiqa",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_NOSEDIVER_HEADER: "Węszący nurek",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ON_ME_HEADER: "Ja stawiam",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_OTHER_HEADER:
    "Przynoszący światło, Rozdaj ubogim, i Zbrodnia popłaca",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PATRON_HEADER: "Dobrodziej Orsinium",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PEACEMAKER_HEADER: "Rozjemca/Rozjemczyni",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_DONE: "Kolor punktów (ukończone)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_DONE_TT:
    "Wpływa na kolor punktów ukończonych osiągnięć",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_MISS: "Kolor punktów (nieukończone)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_MISS_TT:
    "Wpływa na kolor punktów dla nieukończonych osiągnięć",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_SIZE: "Wielkość punktów osiągnięć",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_STYLE: "Styl punktów osiągnięć",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_TOGGLE: "Pokaż nieukończone osiągnięcia",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_TOGGLE_DONE: "Pokaż ukończone osiągnięcia",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_RELIC_HUNTER_HEADER:
    "Mistrzowski łowca/Mistrzowska łowczyni reliktów Wrothgaru",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_DONE: "Kolor tekstu punktów (ukończone)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_DONE_TT:
    "Wpływa na TEKST ukończonych punktów osiągnięć",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_MISS: "Kolor tekstu punktów (nieukończone)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_MISS_TT:
    "Wpływa na TEKST punktów nieukończonych osiągnięć",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_WROTHGAR_JUMPER_HEADER: "Klifowy skoczek Wrothgaru",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLORS_HEADER:
    "Kolor punktu przedmiotów kolekcjonerskich ",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_DONE: "Kolor tekstu ukończonych",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_DONE_TT:
    "Wpływa na TEKST punktu ukończonych przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_TITLE: "Kolor tekstu tytułu nagłówka",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_TITLE_TT:
    "Wpływa na tytuł tekstu osiągnięć przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_UNDONE: "Kolor tekstu brakujących",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_UNDONE_TT:
    "Wpływa na TEKST punktu brakujących przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_DIST: "Odległość na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_DIST_TT:
    "Odległość obszarów przedmiotów kolekcjonerskich na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE: "Pokaż na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE_TT:
    "Pokaż przedmioty kolekcjonerskie na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_DONE_TOGGLE:
    "Pokaż ukończone przedmioty kolekcjonerskie",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_DONE_TOGGLE_TT:
    "Pokaż ukończone obszary przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_HEADER: "Pozycja przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_HEADER_TT:
    "To podmenu obejmuje wszystkie ustawienia związane z przedmiotami kolekcjonerskimi.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_MISC_HEADER: "Różne",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR: "Kolor punktu brakujących",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE: "Kolor punktu ukończonych",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE_TT:
    "Ustawia kolor PUNKTÓW dla ukończonych przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_TT:
    "Ustawia kolor PUNKTÓW dla brakujących przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_LAYER: "Pin layer for Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_LAYER_TT: "Pin layer for Collectibles",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_SIZE:
    "Wielkość punktów przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_SIZE_TT:
    "Wielkość punktów przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_STYLE:
    "Styl punktu przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_ITEM: "Pokaż punkty z nazwami przedmiotów",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_ITEM_TT:
    "Pokazuje nazwy przedmiotów potrzebnych do ukończenia osiągnięcia",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_MOBNAME: "Pokaż nazwy mobów dla punktów",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_MOBNAME_TT:
    "‎Pokazuje nazwy potworów (w języku angielskim w tej chwili), które mogą upuścić przedmioty potrzebne do ukończenia ‎‎osiągnięcia‎",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SUBHEADER: "Ustawienia przedmiotów kolekcjonerskich",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_TOGGLE:
    "Pokaż nieukończone przedmioty kolekcjonerskie",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_TOGGLE_TT:
    "Pokazuje obszary, w których można zabić bestie, aby zebrać przedmioty kolekcjonerskie za osiągnięcia",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE:
    "Kolor tekstu dla ukończonego typu przynęty",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE_TT:
    "Wpływa na tekst PRZYNĘTY dla ukończonej ryby, jeśli jest aktywowany",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE:
    "Kolor tekstu brakującego typu przynęty",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE_TT:
    "Wpływa na tekst PRZYNĘTY brakującej ryby, jeśli jest aktywowany",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE: "Kolor tekstu ukończonych",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE_TT:
    "Wpływa na TEKST punktu dla ukończonej ryby",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_HEADER: "Kolor punktu połowu ryb",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE: "Kolor tekstu tytułu osiągnięć",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE_TT:
    "Wpływa na tytuł tekstu osiągnięć łowienia",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE: "Kolor tekstu brakujących",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE_TT: "Wpływa na TEKST punktu brakującej ryby",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE: "Kolor tekstu ukończonego typu wód",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE_TT:
    "Wpływa na tekst WÓD dla ukończonej ryby, jeśli jest aktywny",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE: "Kolor tekstu brakującego typu wód",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE_TT:
    "Wpływa na tekst WÓD dla brakującej ryby, jeśli jest aktywowany",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST: "Odległość na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST_TT: "Odległość łowisk na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE: "Pokaż na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE_TT: "Pokaż łowiska na kompasie",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE: "Pokaż ukończone pozycje",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE_TT: "Pokazuje ukończone pozycje łowisk",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER: "Pozycje połowów ryb",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER_TT:
    "To podmenu obejmuje wszystkie ustawienia związane z połowem ryb.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_MISC_HEADER: "Różne",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR: "Kolor punktu brakujących",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE: "Kolor punktu ukończonych",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE_TT:
    "Ustawia kolor PUNKTÓW dla zebranych ryb",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_TT: "Ustawia kolor PUNKTÓW dla brakującej ryby",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_LAYER: "Pin layer for Fishing",
}
