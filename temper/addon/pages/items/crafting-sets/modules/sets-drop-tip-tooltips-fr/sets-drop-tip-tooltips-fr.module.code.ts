import {
  SETS_DROP_MECHANIC_ANTIQUITIES,
  SETS_DROP_MECHANIC_AP_ELITE_GEAR_LOCKBOX_MERCHANT,
  SETS_DROP_MECHANIC_MAIL_PVP_REWARDS_FOR_THE_WORTHY,
  SETS_DROP_MECHANIC_OVERLAND_BOSS_DELVE,
  SETS_DROP_MECHANIC_OVERLAND_BOSS_PUBLIC_DUNGEON,
  SETS_DROP_MECHANIC_OVERLAND_CHEST,
  SETS_DROP_MECHANIC_OVERLAND_WORLDBOSS,
  SETS_DROP_MECHANIC_TELVAR_EQUIPMENT_LOCKBOX_MERCHANT,
  SETS_DROP_MECHANIC_TRIAL_BOSS,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-dropmechanics/sets-const-dropmechanics.module.code.ts"
import { cyrodiilAndBattlegroundText } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-tip-shared-text/sets-drop-tip-shared-text.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings/eso-lib-sets-strings.type-declaration.d.ts"

export const FR = {
  [SETS_DROP_MECHANIC_MAIL_PVP_REWARDS_FOR_THE_WORTHY]:
    "Récompenses des dignes (" +
    cyrodiilAndBattlegroundText +
    " par courrier) - Ne contient que les ensembles d'objets les plus récents !\nÀ mesure que de nouveaux ensembles sont ajoutés, les anciens seront retirés d'ici et ajoutés à d'autres sources en Cyrodiil :\nTous les ensembles d'objets JcJ seront désormais obtenus à partir des antres, dolmens et missions du tableau de Cyrodiil.\nLes quêtes quotidiennes de la ville et les marchands seront divisés par Léger, Moyen et Lourd. Exception : Cheydinhal et Chorrol/Weynon Priory récompensent n'importe quel ensemble.\nTous les ensembles JcJ sont disponibles en tant que conteneurs individuels chez les marchands de la ville et les vendeurs d'équipement d'élite.\nLes antres feront tomber les ensembles de taille et de pieds.\nLes dolmens feront tomber des bijoux.\nLes missions du tableau feront tomber toutes les autres pièces d'armure.\nLes missions de prime et d'éclaireur récompenseront des pièces d'armure.\nLes missions de bataille et de front de guerre récompenseront des pièces d'arme.",
  [SETS_DROP_MECHANIC_OVERLAND_BOSS_DELVE]:
    "Les boss des antres ont une chance de faire tomber une taille ou des pieds.",
  [SETS_DROP_MECHANIC_OVERLAND_WORLDBOSS]:
    "Les boss de groupe en zone ont 100% de chances de faire tomber une tête, une poitrine, des jambes ou une arme.",
  [SETS_DROP_MECHANIC_OVERLAND_BOSS_PUBLIC_DUNGEON]:
    "Les boss des donjons publics ont une chance de faire tomber une épaule, une main ou une arme.",
  [SETS_DROP_MECHANIC_OVERLAND_CHEST]:
    "Les coffres obtenus en vainquant une ancre noire ont 100% de chances de faire tomber une bague ou un amulette.\nLes coffres au trésor trouvés dans le monde ont une chance de donner n'importe quelle pièce d'ensemble qui peut tomber dans cette zone :\n-Les coffres simples ont une légère chance\n-Les coffres intermédiaires ont une bonne chance\n-Les coffres avancés et maîtres ont une chance garantie\n-Les coffres au trésor trouvés grâce à une carte au trésor ont une chance garantie",
  [SETS_DROP_MECHANIC_ANTIQUITIES]: GetString(SI_ANTIQUITY_TOOLTIP_TAG),
  [SETS_DROP_MECHANIC_TELVAR_EQUIPMENT_LOCKBOX_MERCHANT]:
    "Coffre échangeable contre des Pierres de TelVar chez un marchand d'équipement TelVar dans la base de votre faction, dans les égouts de la Cité impériale.",
  [SETS_DROP_MECHANIC_AP_ELITE_GEAR_LOCKBOX_MERCHANT]:
    "Coffre échangeable contre des Points d'Alliance chez un marchand de coffres d'équipement élite à Cyrodiil (Porte orientale d'Elsweyr, Porte méridionale de Haute-Roche, Porte septentrionale de Morrowind) ou chez un marchand de champs de bataille à Vvardenfell (Ald Carac, Foyada Quarry, Ularra)",
  [SETS_DROP_MECHANIC_TRIAL_BOSS]:
    "Tous les boss : Mains, Taille, Pieds, Poitrine, Épaule, Tête, Jambes\nBoss final : Arme, Bouclier\nConteneurs de récompenses de quête : Bijoux, Arme, Bouclier (Liés quand ramassés)",
}
