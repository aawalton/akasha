import { achievementName } from "akasha/temper/addon/pages/world/navigation/modules/destinations-data-runtime/destinations-data-runtime.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export const SETTINGS_STRINGS_00: Record<string, string> = {
  SI_TEMPER_DESTINATIONS_COMMANDS: "Lista de comandos de destino:",
  SI_TEMPER_DESTINATIONS_COMMAND_DHLP: "/dhlp (Ayuda para destinos) : Acaba de utilizarlo ;)",
  SI_TEMPER_DESTINATIONS_COMMAND_DSET:
    "/dset (Configuración de destinos) : Abre la ventana de Configuración de destinos",
  SI_TEMPER_DESTINATIONS_FILTER_AYLEID: "(Dest) Pozos Ayleid",
  SI_TEMPER_DESTINATIONS_FILTER_BORDER: "(Dest) Línea fronteriza de Craglorn",
  SI_TEMPER_DESTINATIONS_FILTER_BRAWL: "(Dest) " + zo_strformat(achievementName(1247)),
  SI_TEMPER_DESTINATIONS_FILTER_BRAWL_DONE:
    "(Dest) " + zo_strformat(achievementName(1247)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING: "(Dest) " + zo_strformat(achievementName(1349)),
  SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING_DONE:
    "(Dest) " + zo_strformat(achievementName(1349)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_CHAMPION: "(Dest) Campeones de Mazmorra",
  SI_TEMPER_DESTINATIONS_FILTER_CHAMPION_DONE: "(Dest) Campeones de Mazmorra hechos",
  SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE: "(Dest) Pins de Coleccionables",
  SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE_DONE: "(Dest) Coleccionables hechos",
  SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE: "(Dest) " + zo_strformat(achievementName(1383)),
  SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE_DONE:
    "(Dest) " + zo_strformat(achievementName(1383)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_DEADLANDS_ENTRANCE: "(Dest) Entrada a Tierras Muertas",
  SI_TEMPER_DESTINATIONS_FILTER_DWEMER: "(Dest) Ruinas Dwemer",
  SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS: "(Dest) " + zo_strformat(achievementName(1121)),
  SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS_DONE:
    "(Dest) " + zo_strformat(achievementName(1121)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_FISHING: "(Dest) Pins de pesca",
  SI_TEMPER_DESTINATIONS_FILTER_FISHING_DONE: "(Dest) Pesca realizada",
  SI_TEMPER_DESTINATIONS_FILTER_HIGHISLE_DRUIDICSHRINE: "(Dest) Santuario druídico",
  SI_TEMPER_DESTINATIONS_FILTER_KNOWN: "(Dest) Puntos de interés conocidos",
  SI_TEMPER_DESTINATIONS_FILTER_MAIQ: "(Dest) " + zo_strformat(achievementName(872)),
  SI_TEMPER_DESTINATIONS_FILTER_MAIQ_DONE:
    "(Dest) " + zo_strformat(achievementName(872)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER: "(Dest) " + zo_strformat(achievementName(406)),
  SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER_DONE:
    "(Dest) " + zo_strformat(achievementName(406)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_ON_ME: "(Dest) " + zo_strformat(achievementName(704)),
  SI_TEMPER_DESTINATIONS_FILTER_ON_ME_DONE:
    "(Dest) " + zo_strformat(achievementName(704)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_OTHER: "(Dest) Otros logros",
  SI_TEMPER_DESTINATIONS_FILTER_OTHER_DONE: "(Dest) Otros logros realizados",
  SI_TEMPER_DESTINATIONS_FILTER_PATRON: "(Dest) " + zo_strformat(achievementName(1316)),
  SI_TEMPER_DESTINATIONS_FILTER_PATRON_DONE:
    "(Dest) " + zo_strformat(achievementName(1316)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER: "(Dest) " + zo_strformat(achievementName(716)),
  SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER_DONE:
    "(Dest) " + zo_strformat(achievementName(716)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER: "(Dest) " + zo_strformat(achievementName(1250)),
  SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER_DONE:
    "(Dest) " + zo_strformat(achievementName(1250)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_UNKNOWN: "(Dest) Puntos de interés desconocidos",
  SI_TEMPER_DESTINATIONS_FILTER_VAMPIRE_ALTAR: "(Dest) Altares vampíricos",
  SI_TEMPER_DESTINATIONS_FILTER_WEREWOLF_SHRINE: "(Dest) Altares de hombre lobo",
  SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER: "(Dest) " + zo_strformat(achievementName(1331)),
  SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER_DONE:
    "(Dest) " + zo_strformat(achievementName(1331)) + " Hecho",
  SI_TEMPER_DESTINATIONS_FILTER_WWVAMP: "(Dest) Hombres lobo y vampiros",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_COMPASS_DIST: "Distancia de la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_COMPASS_TOGGLE: "Mostrar logros en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_PIN_LAYER: "Capa de pines para todos los logros",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_BRAWL_HEADER: "Una última pelea",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_BREAKING_HEADER: "Allanamiento",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE: "Pin de zona al frente",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE_TT:
    "Esto alternará si los pines de la ZONA (si están activos) deben mostrarse delante de los pines de la mazmorra o no",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_PIN_HEADER: "Campeones de mazmorra",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_PIN_SIZE:
    "Tamaño de la clavija para los campeones de mazmorra",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE: "Mostrar en mapas de zonas",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE_TT:
    "Esto es para activar/desactivar a los campeones (jefes de mazmorras en solitario) en los MAPAS DE ZONA",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CUTPURSE_HEADER: "Ratero/a de alto nivel",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_EARTHLYPOS_HEADER: "Posesiones terrenales",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_GLOBAL_HEADER: "Posiciones de logro - Ajustes globales",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_GLOBAL_HEADER_TT:
    "Este submenú abarca los ajustes de Logro Global",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_HEADER: "Posiciones de logro",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_HEADER_TT:
    "Este submenú abarca la mayoría de los logros del juego (demasiados para enumerarlos aquí)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_MAIQ_HEADER: "Me gusta M'aiq",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_NOSEDIVER_HEADER: "Saltador/a de narices",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ON_ME_HEADER: "Esta la pago yo",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_OTHER_HEADER: "Iluminador, Dando limosna y El crimen se paga",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PATRON_HEADER: "Mecenas de Orsinium",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PEACEMAKER_HEADER: "Pacificador",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_DONE: "Color del pin (completado)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_DONE_TT:
    "Afecta al color del PIN de los logros completos",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_MISS: "Color del pin (incompleto)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_MISS_TT:
    "Afecta al color del PIN de los logros incompletos",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_SIZE: "Tamaño del pin para el logro",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_STYLE: "Estilo de pin para el logro",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_TOGGLE: "Mostrar logros incompletos",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_TOGGLE_DONE: "Mostrar logro completado",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_RELIC_HUNTER_HEADER:
    "Maestro cazador/a de reliquias de Wrothgar",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_DONE: "Color del texto del pin (completado)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_DONE_TT:
    "Afecta al pin TEXT de los logros completos",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_MISS: "Color del texto del pin (incompleto)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_MISS_TT:
    "Afecta al pin TEXT de los logros incompletos",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_WROTHGAR_JUMPER_HEADER: "Wrothgar Saltador de Acantilados",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLORS_HEADER: "Colores del pin coleccionable",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_DONE: "Colordel texto terminado",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_DONE_TT:
    "Afecta al TEXTO de los pines de los Coleccionables completados",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_TITLE:
    "Color del texto del título de la cabecera",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_TITLE_TT:
    "Afecta al título del texto del logro de Coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_UNDONE: "Falta el color del texto",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_UNDONE_TT:
    "Afecta al TEXTO de los pines de los Coleccionables perdidos",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_DIST: "Distancia en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_DIST_TT:
    "Distancia para las áreas de Coleccionables en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE: "Mostrar en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE_TT:
    "Mostrar coleccionables en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_DONE_TOGGLE: "Mostrar coleccionables completados",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_DONE_TOGGLE_TT:
    "Mostrar áreas de Coleccionables completadas",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_HEADER: "Posiciones coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_HEADER_TT:
    "Este submenú abarca todos los ajustes relacionados con los coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_MISC_HEADER: "Varios",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR: "Falta el color del pin",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE: "Color del pin completado",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE_TT:
    "Establece el color de los PINS de los coleccionables completados",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_TT:
    "Establece el color de los PINS de los coleccionables perdidos",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_LAYER: "Capa de pines para coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_LAYER_TT: "Capa de pines para Coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_SIZE: "Tamaño del pin para coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_SIZE_TT:
    "Tamaño de los pines para los coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_STYLE: "Estilo de pin para coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_ITEM:
    "Mostrar los nombres de los artículos en los pines",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_ITEM_TT:
    "Muestra el nombre de los objetos necesarios para completar el logro",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_MOBNAME:
    "Mostrar nombres de mafias en los pines",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_MOBNAME_TT:
    "Muestra los nombres de los monstruos (en inglés de momento) que pueden soltar los objetos necesarios para completar el logro",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SUBHEADER: "Ajustes coleccionables",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_TOGGLE: "Mostrar coleccionables incompletos",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_TOGGLE_TT:
    "Muestra las zonas en las que se puede matar a las bestias para recoger los coleccionables de los logros",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE:
    "Color del texto del tipo de cebo completado",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE_TT:
    "Afecta al texto del pin BAIT para los peces completados, si está activado",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE:
    "Falta el color del texto del tipo de cebo",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE_TT:
    "Afecta al texto del pin BAIT para los peces perdidos, si está activado",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE: "Color del texto terminado",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE_TT:
    "Afecta al TEXTO del pin para los Peces completados",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_HEADER: "Colores del pin de pesca",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE: "Color del texto del título del logro",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE_TT:
    "Afecta al título del texto del logro de pesca",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE: "Falta el color del texto",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE_TT:
    "Afecta al TEXTO de la chincheta para los peces perdidos",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE:
    "Color del texto del tipo de agua completado",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE_TT:
    "Afecta al texto del pin AGUA para los Peces completados, si está activado",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE:
    "Falta el color del texto del tipo de agua",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE_TT:
    "Afecta al texto del pin AGUA para los peces que faltan, si está activado",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST: "Distancia en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST_TT:
    "Distancia para los agujeros de pesca en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE: "Mostrar en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE_TT:
    "Mostrar agujeros de pesca en la brújula",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE: "Mostrar posiciones completadas",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE_TT:
    "Mostrar posiciones de agujeros de pesca completados",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER: "Posiciones de pesca",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER_TT:
    "Este submenú abarca todos los ajustes relacionados con la pesca",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_MISC_HEADER: "Varios",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR: "Falta el colordel pin",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE: "Color del pin completado",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE_TT:
    "Establece el color de los PINS para los peces recogidos",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_TT:
    "Establece el color de los PINS para los peces perdidos",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_LAYER: "Capa de pines para la pesca",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_LAYER_TT: "Capa de pines para la pesca",
}
