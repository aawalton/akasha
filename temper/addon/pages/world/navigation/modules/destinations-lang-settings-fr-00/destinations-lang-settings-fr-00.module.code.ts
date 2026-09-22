import { achievementName } from "akasha/temper/addon/pages/world/navigation/modules/destinations-data-runtime/destinations-data-runtime.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export const SETTINGS_STRINGS_00: Record<string, string> = {
  SI_TEMPER_DESTINATIONS_COMMANDS: "Liste des commandes de Destinations :",
  SI_TEMPER_DESTINATIONS_COMMAND_DHLP:
    "/dhlp (Aide de Destinations) : Vous venez juste de l'utiliser ;)",
  SI_TEMPER_DESTINATIONS_COMMAND_DSET:
    "/dset (Paramètres de Destinations) : Ouvre les paramètres de configuration de Destinations.",
  SI_TEMPER_DESTINATIONS_FILTER_AYLEID: "(Dest) Puits ayléides",
  SI_TEMPER_DESTINATIONS_FILTER_BORDER: "(Dest) Frontière de Raidelorn",
  SI_TEMPER_DESTINATIONS_FILTER_BRAWL: "(Dest) " + zo_strformat(achievementName(1247)),
  SI_TEMPER_DESTINATIONS_FILTER_BRAWL_DONE: zo_strformat(achievementName(1247)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING: "(Dest) " + zo_strformat(achievementName(1349)),
  SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING_DONE:
    zo_strformat(achievementName(1349)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_CHAMPION: "(Dest) Champions de donjon",
  SI_TEMPER_DESTINATIONS_FILTER_CHAMPION_DONE: "Champions de donjon finis",
  SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE: "(Dest) Trophées",
  SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE_DONE: "Trophées finis",
  SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE: "(Dest) " + zo_strformat(achievementName(1383)),
  SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE_DONE: zo_strformat(achievementName(1383)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_DEADLANDS_ENTRANCE: "(Dest) Entrée des Terres mortes",
  SI_TEMPER_DESTINATIONS_FILTER_DWEMER: "(Dest) Ruines Dwemer",
  SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS: "(Dest) " + zo_strformat(achievementName(1121)),
  SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS_DONE: zo_strformat(achievementName(1121)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_FISHING: "(Dest) Points de pêche",
  SI_TEMPER_DESTINATIONS_FILTER_FISHING_DONE: "Points de pêche finis",
  SI_TEMPER_DESTINATIONS_FILTER_HIGHISLE_DRUIDICSHRINE: "(Dest) Sanctuaire druidique",
  SI_TEMPER_DESTINATIONS_FILTER_KNOWN: "(Dest) PI Connus",
  SI_TEMPER_DESTINATIONS_FILTER_MAIQ: "(Dest) " + zo_strformat(achievementName(872)),
  SI_TEMPER_DESTINATIONS_FILTER_MAIQ_DONE: zo_strformat(achievementName(872)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER: "(Dest) " + zo_strformat(achievementName(406)),
  SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER_DONE: zo_strformat(achievementName(406)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_ON_ME: "(Dest) " + zo_strformat(achievementName(704)),
  SI_TEMPER_DESTINATIONS_FILTER_ON_ME_DONE: zo_strformat(achievementName(704)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_OTHER: "(Dest) Autres succès",
  SI_TEMPER_DESTINATIONS_FILTER_OTHER_DONE: "Autres succès finis",
  SI_TEMPER_DESTINATIONS_FILTER_PATRON: "(Dest) " + zo_strformat(achievementName(1316)),
  SI_TEMPER_DESTINATIONS_FILTER_PATRON_DONE: zo_strformat(achievementName(1316)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER: "(Dest) " + zo_strformat(achievementName(716)),
  SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER_DONE: zo_strformat(achievementName(716)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER: "(Dest) " + zo_strformat(achievementName(1250)),
  SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER_DONE: zo_strformat(achievementName(1250)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_UNKNOWN: "(Dest) PI Inconnus",
  SI_TEMPER_DESTINATIONS_FILTER_VAMPIRE_ALTAR: "(Dest) Autels de Vampire",
  SI_TEMPER_DESTINATIONS_FILTER_WEREWOLF_SHRINE: "(Dest) Sanctuaires de Loup-garou",
  SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER: "(Dest) " + zo_strformat(achievementName(1331)),
  SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER_DONE:
    zo_strformat(achievementName(1331)) + " finis",
  SI_TEMPER_DESTINATIONS_FILTER_WWVAMP: "(Dest) Loups-garous et Vampires",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_COMPASS_DIST:
    "Distance d'affichage des icônes sur le compas",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_COMPASS_TOGGLE: "Afficher les Succès sur le compas",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ALL_PIN_LAYER:
    "Superposition des icônes pour tous les Succès",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_BRAWL_HEADER: "Une dernière bagarre",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_BREAKING_HEADER: "Entrée par effraction",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE: "Superposition des icônes de zone",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE_TT:
    "Détermine si les icônes de ZONE doivent être affichées devant les icônes de donjon ou non.",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_PIN_HEADER: "Champions de Donjon",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_PIN_SIZE:
    "Taille des icônes des Champions de Donjon",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE: "Afficher sur les cartes de zone",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE_TT:
    "Active/Désactive l'affichage des Champions (de donjon solo) sur les CARTES DE ZONE.",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_CUTPURSE_HEADER: "De haut vol",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_EARTHLYPOS_HEADER: "Possessions terrestres",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_GLOBAL_HEADER: "Emplacements des Succès - Paramètres globaux",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_GLOBAL_HEADER_TT:
    "Ce sous-menu gère les paramètres globaux des succès.",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_HEADER: "Emplacements des Succès",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_HEADER_TT:
    "Ce sous-menu gère la plupart des succès dans le jeu (la liste est trop longue).",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_MAIQ_HEADER: "Il n'y a que M'aiq qui m'aille",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_NOSEDIVER_HEADER: "Plongeur en piqué",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_ON_ME_HEADER: "C'est ma tournée",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_OTHER_HEADER:
    "Port. de lumière, Don. aux pauvres et Crime paie",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PATRON_HEADER: "Mécène d'Orsinium",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PEACEMAKER_HEADER: "Pacificateur",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_DONE: "Couleur de l'icône (finis)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_DONE_TT:
    "Détermine la couleur de l'icône des succès finis.",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_MISS: "Couleur de l'icône (non finis)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_COLOR_MISS_TT:
    "Détermine la couleur de l'icône des succès non finis.",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_SIZE: "Taille de cette icône pour les Succès",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_STYLE: "Style de cette icône pour les Succès",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_TOGGLE: "Afficher les Succès non finis",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_PIN_TOGGLE_DONE: "Afficher les Succès finis",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_RELIC_HUNTER_HEADER: "Chasseur de reliques de Wrothgar",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_DONE: "Couleur du texte (finis)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_DONE_TT:
    "Détermine la couleur du texte des succès finis.",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_MISS: "Couleur du texte (non finis)",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_TXT_COLOR_MISS_TT:
    "Détermine la couleur du texte des succès non finis.",
  SI_TEMPER_DESTINATIONS_SETTINGS_ACH_WROTHGAR_JUMPER_HEADER: "Sauteur des falaises de Wrothgar",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLORS_HEADER: "Couleur de l'icône des Trophées",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_DONE: "Couleur du texte des Trophées finis",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_DONE_TT:
    "Détermine la couleur du texte pour les trophées finis.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_TITLE:
    "Couleur du texte du titre de l'en-tête",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_TITLE_TT:
    "Détermine la couleur du titre du succès des trophées.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_UNDONE:
    "Couleur du texte des Trophées manquants",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COLOR_UNDONE_TT:
    "Détermine la couleur du texte des trophées manquants.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_DIST:
    "Distance d'affichage des icônes sur le compas",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_DIST_TT:
    "Détermine la distance d'affichage des icônes des trophées sur le compas.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE: "Afficher sur le compas",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE_TT:
    "Affiche les icônes des trophées sur le compas.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_DONE_TOGGLE: "Afficher les Trophées finis",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_DONE_TOGGLE_TT:
    "Affiche les zones où les trophées ont déjà été déverouillé.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_HEADER: "Emplacements des Trophées",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_HEADER_TT:
    "Ce sous-menu gère tous les paramètres relatifs aux trophées.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_MISC_HEADER: "Divers",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR:
    "Couleur de l'icône des Trophées manquants",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE:
    "Couleur de l'icône des Trophées finis",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE_TT:
    "Détermine la couleur des icônes pour les trophées finis.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_COLOR_TT:
    "Détermine la couleur des icônes pour les trophées manquants.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_LAYER: "Superposition des icônes des Trophées",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_LAYER_TT:
    "Détermine le niveau de superposition des icônes des trophées sur les autres icônes.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_SIZE: "Taille de l'icône des Trophées",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_SIZE_TT:
    "Détermine la taille de l'icône des trophées.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_PIN_STYLE: "Style de l'icône des Trophées",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_ITEM: "Afficher le nom de l'objet",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_ITEM_TT:
    "Affiche le nom des objets nécessaires pour déverrouiller les succès.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_MOBNAME: "Afficher le nom des monstres",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SHOW_MOBNAME_TT:
    "Affiche le nom des monstres (en anglais uniquement) qui donnent l'objet nécessaire pour déverrouiller les succès.",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_SUBHEADER: "Paramètres des Trophées",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_TOGGLE: "Afficher les Trophées incomplets",
  SI_TEMPER_DESTINATIONS_SETTINGS_COLLECTIBLES_TOGGLE_TT:
    "Affiche les zones où les monstres peuvent être tués afin d'obtenir les trophées pour déverouiller les succès.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE: "Couleur du texte des appats (pêchés)",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE_TT:
    "Détermine la couleur du texte des appats pour les poissons déjà pêchés.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE:
    "Couleur du texte des appats (non pêchés)",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE_TT:
    "Détermine la couleur du texte des appats pour les poissons non pêchés.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE: "Couleur du texte (pêchés)",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE_TT:
    "Détermine la couleur du texte des poissons déjà pêchés.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_HEADER: "Couleur de l'icône de Pêche",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE: "Couleur du texte des Succès",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE_TT:
    "Détermine la couleur du texte des succès de la pêche.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE:
    "Couleur du texte des poissons (non pêchés)",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE_TT:
    "Détermine la couleur du texte des poissons non pêchés.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE:
    "Couleur du texte des types d'eaux (pêchés)",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE_TT:
    "Détermine la couleur du texte des type d'eaux pour les poissons déjà pêchés.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE:
    "Couleur du texte des types d'eaux (non pêchés)",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE_TT:
    "Détermine la couleur du texte des types d'eaux pour les poissons non pêchés.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST: "Distance d'affichage sur le compas",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST_TT:
    "Détermine la distance d'affichage des trous de pêche sur le compas.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE: "Afficher sur le compas",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE_TT:
    "Affiche les trous de pêche sur le compas.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE: "Afficher les emplacements terminés",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE_TT:
    "Affiche les trous de pêche déjà terminés.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER: "Emplacements de Pêche",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER_TT:
    "Ce sous-menu gère tous les paramètres relatifs à la pêche.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_MISC_HEADER: "Divers",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR: "Couleur de l'icône (non pêchés)",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE: "Couleurs des icônes (pêchés)",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE_TT:
    "Détermine la couleur de l'icône des poissons déjà pêchés.",
  SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_TT:
    "Détermine la couleur des icônes des poissons non pêchés.",
}
