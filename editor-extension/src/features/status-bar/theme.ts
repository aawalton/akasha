/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// These two hexes were read from `PROJECT_BUCKET_COLORS` in `@shared/project-status`
// so the bar painted one palette rather than two. That package is leaving the code
// repository with the project model, and the taxonomy it held stands in the
// instructions repository, which this build does not reach — so the two the usage
// means still need are written here. Nothing else in this bar carries a status colour.
export const SEPARATOR_HEX = '#888888';
export const SEPARATOR_GLYPH = '|';

export const BLUE_HEX = '#2c5a9d';
export const PURPLE_HEX = '#7c4ca3';
